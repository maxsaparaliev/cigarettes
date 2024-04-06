import { ScrollArea } from "@mantine/core";
import { IconBuildingFactory2, IconWorld } from "@tabler/icons-react";
import classes from "./sidebar.module.css";
import { LinksGroup } from "@/components/links-group/links-group";
import { useEffect, useState } from "react";
import { getCountries, getManufacturers } from "@/api/api";
import { TSidebarItem } from "@/api/types";

export const Sidebar: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<TSidebarItem[] | null>();
  const [countries, setCountries] = useState<TSidebarItem[] | null>();

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

  useEffect(() => {
    getManufacturers().then(({ data, error }) => setManufacturers(data));
    getCountries().then(({ data, error }) => setCountries(data));
  }, []);

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
