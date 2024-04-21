import { Drawer, Group } from "@mantine/core";
import { Sidebar } from "@/components/sidebar/sidebar";
import React from "react";
import Link from "next/link";

type MobileHeaderType = {
  opened: boolean;
  onClose: () => void;
};

export const MobileHeader: React.FC<MobileHeaderType> = ({
  opened,
  onClose,
}) => {
  return (
    <Drawer.Root opened={opened} onClose={onClose} position={"right"}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header className={"bg-dark"}>
          <Drawer.Title className={"text-dimmed"}>Фильтры</Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body className={"bg-dark h-full"}>
          <Group grow className={"pb-4 pt-2"}>
            <Link href={"/basket"} className={"text-lg underline"}>
              Корзина/Заказать
            </Link>
          </Group>
          <Sidebar isDrawer={true} />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
