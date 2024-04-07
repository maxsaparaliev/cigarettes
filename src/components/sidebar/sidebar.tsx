import { ScrollArea } from "@mantine/core";
import { IconBuildingFactory2, IconWorld } from "@tabler/icons-react";
import classes from "./sidebar.module.css";
import { LinksGroup } from "@/components/links-group/links-group";
import { useSelector } from "react-redux";
import {
  selectCountries,
  selectManufacturers,
} from "@/store/default/selectors";
import React from "react";

export const Sidebar: React.FC = () => {
  const manufacturers = useSelector(selectCountries);
  const countries = useSelector(selectManufacturers);
  const sidebarLinks = [
    {
      label: "Производитель",
      icon: IconBuildingFactory2,
      links: manufacturers,
      initiallyOpened: true,
    },
    {
      label: "Страна производитель",
      icon: IconWorld,
      initiallyOpened: true,
      links: countries,
    },
  ];

  const sidebarItems = sidebarLinks.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      {/*<div className={classes.header}>*/}
      {/*  <Group justify="space-between">*/}
      {/*    <Code fw={700}>v3.1.2</Code>*/}
      {/*  </Group>*/}
      {/*</div>*/}

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{sidebarItems}</div>
      </ScrollArea>
    </nav>
  );
};
