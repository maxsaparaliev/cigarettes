import {
  Button,
  Flex,
  NumberInput,
  NumberInputProps,
  ScrollArea,
  Space,
  Stack,
  Title,
} from "@mantine/core";
import {IconBuildingFactory2, IconChartBar, IconWorld} from "@tabler/icons-react";
import classes from "./sidebar.module.scss";
import {
  LinksGroup,
  TCheckboxValue,
} from "@/components/links-group/links-group";
import { useDispatch, useSelector } from "react-redux";
import { selectCountries, selectManufacturers, selectStrength } from "@/store/common/selectors";
import React, { useState } from "react";
import { getProducts } from "@/store/data/thunks";
import { selectCurrentPage } from "@/store/data/selectors";
import { SIDEBAR_LABELS } from "@/constants/constants";
import cn from "classnames";

export type TSidebarFilters = {
  minPrice: number | string;
  maxPrice: number | string;
  manufacturer: Array<string>;
  country: Array<string>;
  strength: Array<string>;
};

const initialFilters: TSidebarFilters = {
  manufacturer: [],
  country: [],
  strength: [],
  maxPrice: 0,
  minPrice: 0,
};

type SidebarType = {
  isDrawer: boolean;
};

export const Sidebar: React.FC<SidebarType> = ({ isDrawer }) => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(selectCountries);
  const countries = useSelector(selectManufacturers);
  const strength = useSelector(selectStrength);
  const currentPage = useSelector(selectCurrentPage);
  const [filters, setFilters] = useState<TSidebarFilters>(initialFilters);
  const sidebarLinks = [
    {
      label: "Страна",
      links: manufacturers,
      icon: IconWorld,
      initiallyOpened: true,
    },
    {
      label: "Производитель",
      icon: IconBuildingFactory2,
      initiallyOpened: true,
      links: countries,
    },
    {
      label: "Крепкость",
      links: strength,
      icon: IconChartBar,
      initiallyOpened: true,
    },
  ];

  const handleCheckBox = ({ id, value, label }: TCheckboxValue) => {
    if (label.toLowerCase() === SIDEBAR_LABELS.MANUFACTURER.toLowerCase()) {
      setFilters((prevFilters) => {
        const index = prevFilters.manufacturer.indexOf(value);
        if (index === -1) {
          return {
            ...prevFilters,
            manufacturer: [...prevFilters.manufacturer, value],
          };
        } else {
          return {
            ...prevFilters,
            manufacturer: [
              ...prevFilters.manufacturer.slice(0, index),
              ...prevFilters.manufacturer.slice(index + 1),
            ],
          };
        }
      });
    }
    if (label.toLowerCase() === SIDEBAR_LABELS.COUNTRY.toLowerCase()) {
      setFilters((prevFilters) => {
        const index = prevFilters.country.indexOf(value);
        if (index === -1) {
          return {
            ...prevFilters,
            country: [...prevFilters.country, value],
          };
        } else {
          return {
            ...prevFilters,
            country: [
              ...prevFilters.country.slice(0, index),
              ...prevFilters.country.slice(index + 1),
            ],
          };
        }
      });
    }
    if (label.toLowerCase() === SIDEBAR_LABELS.STRENGTH.toLowerCase()) {
      setFilters((prevFilters) => {
        const index = prevFilters.strength.indexOf(value);
        if (index === -1) {
          return {
            ...prevFilters,
            strength: [...prevFilters.strength, value],
          };
        } else {
          return {
            ...prevFilters,
            strength: [
              ...prevFilters.strength.slice(0, index),
              ...prevFilters.strength.slice(index + 1),
            ],
          };
        }
      });
    }
  };

  const sidebarItems = sidebarLinks.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      filters={filters}
      setFilters={setFilters}
      handleCheckBox={handleCheckBox}
    />
  ));

  const numberInputProps: NumberInputProps = {
    min: 0,
    max: 10000,
    clampBehavior: "strict",
    suffix: "₽",
  };

  const handleMinNumberInput = (value: number | string) => {
    setFilters({
      ...filters,
      minPrice: value,
    });
  };
  const handleMaxNumberInput = (value: number | string) => {
    setFilters({
      ...filters,
      maxPrice: value,
    });
  };

  const applyFilters = () => {
    dispatch(getProducts({ page: currentPage, filters }) as any);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };
  return (
    <nav className={cn([classes.navbar, !isDrawer && classes.navbarHide])}>
      <div className={classes.header}>
        <Stack gap={"sm"}>
          <Title order={4}>Цена</Title>
          <NumberInput
            size={"sm"}
            placeholder="Минимальная цена"
            {...numberInputProps}
            onChange={handleMinNumberInput}
            value={filters.minPrice || ""}
          />
          <NumberInput
            size={"sm"}
            placeholder="Максимальная цена"
            {...numberInputProps}
            onChange={handleMaxNumberInput}
            value={filters.maxPrice || ""}
          />
        </Stack>
      </div>
      <Space h="md" />
      <Title order={4}>Фильтры</Title>
      <Space h="xs" />

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{sidebarItems}</div>
        <Flex gap={"sm"} justify={"center"} align={"center"}>
          <Button onClick={clearFilters} size={"xs"} color={"red"}>
            Сбросить
          </Button>
          <Button onClick={applyFilters} size={"xs"} color={"indigo"}>
            Применить
          </Button>
        </Flex>
      </ScrollArea>
    </nav>
  );
};
