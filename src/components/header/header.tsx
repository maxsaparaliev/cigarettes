import { Burger, Flex, Group, Button } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import classes from "./header.module.scss";
import { useSelector } from "react-redux";
import { selectBasketData } from "@/store/basket/selectors";
import Link from "next/link";
import { Logotype } from "@/utils/logo";
import cn from "classnames";
import { MobileHeader } from "@/components/header/mobile-header";
import {IconArrowRight} from "@tabler/icons-react";

const links = [{ link: "/basket", label: "Корзина/Заказать" }];

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const basketData = useSelector(selectBasketData);
  const { width } = useViewportSize();

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={cn([classes.link])}>
      {link.label}
    </Link>
  ));

  return (
    <Flex
      direction={"row"}
      justify={"space-between"}
      align={"center"}
      className={cn([classes.header])}
    >
      <header className={classes.headerInner}>
        <Flex justify={"space-between"} align={"center"}>
          <Link href={"/"}>
            <Logotype />
          </Link>
          <Group gap={5} visibleFrom="xs">
            {/*{items}*/}
            <Button
              component="a"
              href="/basket"
              variant="light"
              rightSection={<IconArrowRight size={14} />}
            >
              Корзина
            </Button>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          {width <= 576 && <MobileHeader opened={opened} onClose={toggle} />}
        </Flex>
      </header>
    </Flex>
  );
};
