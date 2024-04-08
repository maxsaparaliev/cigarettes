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
import { IconBuildingFactory2, IconWorld } from "@tabler/icons-react";
import classes from "./sidebar.module.css";
import {
  LinksGroup,
  TCheckboxValue,
} from "@/components/links-group/links-group";
import { useDispatch, useSelector } from "react-redux";
import { selectCountries, selectManufacturers } from "@/store/common/selectors";
import React, { useState } from "react";
import { getProducts } from "@/store/data/thunks";
import { selectCurrentPage } from "@/store/data/selectors";

export type TSidebarFilters = {
  minPrice?: number | string;
  maxPrice?: number | string;
  manufacturer?: Array<string>;
  country?: Array<string>;
};

export const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(selectCountries);
  const countries = useSelector(selectManufacturers);
  const currentPage = useSelector(selectCurrentPage);
  const [filters, setFilters] = useState<TSidebarFilters | null>(null);
  const sidebarLinks = [
    {
      label: "Страна",
      icon: IconBuildingFactory2,
      links: manufacturers,
      initiallyOpened: true,
    },
    {
      label: "Производитель",
      icon: IconWorld,
      initiallyOpened: true,
      links: countries,
    },
  ];

  const handleCheckBox = ({ id, value, label }: TCheckboxValue) => {
    if (label.toLowerCase() === "Производитель".toLowerCase()) {
      setFilters({
        ...filters,
        manufacturer: [
          ...(Array.isArray(filters?.manufacturer)
            ? filters?.manufacturer
            : []),
          value,
        ],
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

  console.log(filters, "setFilters");
  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Stack gap={"sm"}>
          <Title order={4}>Цена</Title>
          <NumberInput
            size={"sm"}
            placeholder="Минимальная цена"
            {...numberInputProps}
            onChange={handleMinNumberInput}
          />
          <NumberInput
            size={"sm"}
            placeholder="Максимальная цена"
            {...numberInputProps}
            onChange={handleMaxNumberInput}
          />
        </Stack>
      </div>
      <Space h="md" />
      <Title order={4}>Фильтры</Title>
      <Space h="xs" />

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{sidebarItems}</div>
        <Flex justify={"center"} align={"center"}>
          <Button onClick={applyFilters} size={"sm"}>
            Применить
          </Button>
        </Flex>
      </ScrollArea>
    </nav>
  );
};
