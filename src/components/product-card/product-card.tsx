import { IconShoppingBag } from "@tabler/icons-react";
import {
  ActionIcon,
  Badge,
  Card,
  Center,
  Group,
  Image,
  rem,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import classes from "./product-card.module.scss";
import React from "react";

export type TProductData = {
  id: number;
  title: string;
  available: boolean;
  capacity: string;
  country: string;
  created_at: Date;
  description: string;
  image: string;
  manufacturer: string;
  nicotine: number;
  pack: string;
  price: number;
  tar: number;
};

type Props = {
  data: TProductData;
};
export const ProductCard: React.FC<Props> = ({ data }) => {
  const theme = useMantineTheme();

  const {
    tar,
    country,
    id,
    available,
    capacity,
    created_at,
    description,
    manufacturer,
    nicotine,
    pack,
    price,
    image,
    title,
  } = data;

  return (
    <Card shadow={"xs"} radius="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={"product-card"} height={200} width={300} />
      </Card.Section>

      <Badge
        autoContrast
        className={classes.rating}
        color={available ? "green" : "red"}
        size={"xs"}
      >
        {available ? "В наличии" : "Нет в наличии"}
      </Badge>

      <Text
        className={classes.title}
        fw={500}
        component="a"
        truncate={"end"}
        lineClamp={2}
      >
        {title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={3}>
        {description}
      </Text>

      <Group justify={"space-between"} className={classes.country}>
        <Text c="dimmed" fz="sm">
          Страна
        </Text>
        <Text c="dimmed" fz="sm">
          {country}
        </Text>
      </Group>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Text fw={700}>{price} руб</Text>
        </Center>

        <Group gap={8} mr={0}>
          <Tooltip
            label="Добавить в корзину"
            color="rgba(0, 0, 0, 1)"
            arrowOffset={11}
            arrowSize={4}
            withArrow
            openDelay={500}
          >
            <ActionIcon className={classes.action} size="md">
              <IconShoppingBag
                style={{ width: rem(24), height: rem(24) }}
                color={theme.colors.blue[6]}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Card>
  );
};
