import { useState } from "react";
import { Burger, Flex, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./header.module.scss";
import { useSelector } from "react-redux";
import { selectBasketData } from "@/store/basket/selectors";
import Link from "next/link";

const links = [{ link: "/basket", label: "Корзина/Заказать" }];

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState("");
  const basketData = useSelector(selectBasketData);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={[classes.link, active === link.link && classes.active].join(
        " ",
      )}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
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
