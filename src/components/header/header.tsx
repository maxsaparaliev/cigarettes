import { Burger, Button, Flex, Group } from "@mantine/core";
import { useDisclosure, useViewportSize } from "@mantine/hooks";
import classes from "./header.module.scss";
import { useSelector } from "react-redux";
import { selectBasketData } from "@/store/basket/selectors";
import Link from "next/link";
import { Logotype } from "@/utils/logo";
import cn from "classnames";
import { MobileHeader } from "@/components/header/mobile-header";
import { IconArrowRight } from "@tabler/icons-react";

export const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const basketData = useSelector(selectBasketData);
  const { width } = useViewportSize();

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
            <Link href="/basket">
              <Button
                component="a"
                variant="light"
                rightSection={<IconArrowRight size={14} />}
              >
                Корзина
              </Button>
            </Link>
          </Group>

          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />

          {width <= 576 && <MobileHeader opened={opened} onClose={toggle} />}
        </Flex>
      </header>
    </Flex>
  );
};
