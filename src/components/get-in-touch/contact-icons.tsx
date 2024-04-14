import { Box, rem, Stack, Text } from "@mantine/core";
import {
  IconAt,
  IconCurrencyRubel,
  IconPhone,
  IconSun,
} from "@tabler/icons-react";
import classes from "./contact-icon.module.scss";
import React from "react";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}
type ContactIconsList = {
  total: number;
};

export const ContactIconsList: React.FC<ContactIconsList> = ({ total }) => {
  const MOCKDATA = [
    { title: "Email", description: "hello@mantine.dev", icon: IconAt },
    { title: "Телефон", description: "+49 (800) 335 35 35", icon: IconPhone },
    { title: "Итого", description: total, icon: IconCurrencyRubel },
  ];

  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
};
