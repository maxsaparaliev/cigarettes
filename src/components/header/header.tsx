import { useState } from "react";
import { Badge, Burger, Flex, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./header.module.scss";
import { useSelector } from "react-redux";
import { selectBasketData } from "@/store/basket/selectors";

const links = [{ link: "/basket", label: "Корзина/Заказать" }];

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const basketData = useSelector(selectBasketData);

  const items = links.map((link) => (
    // <a
    //   key={link.label}
    //   href={link.link}
    //   className={[
    //     classes.link,
    //     active === link.link ? classes.active : "",
    //   ].join(" ")}
    //   onClick={(event) => {
    //     event.preventDefault();
    //     setActive(link.link);
    //   }}
    // >
    //   {link.label}
    // </a>
    <NavLink
      label={link.label}
      rightSection={
        <Badge color="red" circle>
          {basketData.length}
        </Badge>
      }
    />
  ));

  return (
    <Flex
      direction={"row"}
      justify={"space-between"}
      align={"center"}
      className={classes.header}
    >
      <header className={classes.headerInner}>
        <Flex justify={"space-between"} align={"center"}>
          <MantineLogo size={28} />
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Flex>
      </header>
    </Flex>
  );
};
