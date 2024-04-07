import { useState } from "react";
import {
  Box,
  Checkbox,
  Collapse,
  Group,
  rem,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconCalendarStats, IconChevronRight } from "@tabler/icons-react";
import classes from "./links-group.module.scss";
import { TSidebarItem } from "@/api/types";

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: Array<TSidebarItem> | null;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Checkbox
      label={link.value}
      key={link.id}
      className={classes.link}
      size={"xs"}
    />
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group justify="space-between" gap={0}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="white" color="indigo" size={24}>
              <Icon style={{ width: rem(18), height: rem(18) }} store={1} />
            </ThemeIcon>
            <Box ml="xs">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};
