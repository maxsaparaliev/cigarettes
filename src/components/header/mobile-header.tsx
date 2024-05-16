import {Button, Drawer, Group} from "@mantine/core";
import { Sidebar } from "@/components/sidebar/sidebar";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {IconArrowRight} from "@tabler/icons-react";

type MobileHeaderType = {
  opened: boolean;
  onClose: () => void;
};

export const MobileHeader: React.FC<MobileHeaderType> = ({
  opened,
  onClose,
}) => {
  const router = useRouter();
  const currentPage = router.pathname;
  const isMainPage = currentPage === "/";
  return (
    <Drawer.Root opened={opened} onClose={onClose} position={"right"}>
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body className={" h-full"}>
          <Group grow className={"pb-4 pt-2"}>
            <Button
              component="a"
              href="/basket"
              variant="light"
              rightSection={<IconArrowRight size={14} />}
            >
              Корзина
            </Button>
          </Group>
          {isMainPage && <Sidebar isDrawer={true} />}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
