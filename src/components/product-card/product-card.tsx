import { IconShoppingBag } from "@tabler/icons-react";
import {
  ActionIcon,
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
import { useDispatch } from "react-redux";
import { addToBasket } from "@/store/basket/reducers";
import { notifications } from "@mantine/notifications";
import Link from "next/link";

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
  product: TProductData;
};
export const ProductCard: React.FC<Props> = ({ product }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const addProduct = () => {
    dispatch(addToBasket({ ...product, amount: 1 }));
    notifications.show({
      title: "Default notification",
      message: "Hey there, your code is awesome! 🤥",
    });
  };

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
  } = product;

  const productLink = {
    href: "/product/[productId]",
    as: `/product/${id}`,
  };

  return (
    <Card shadow={"md"} radius="md" className={classes.card}>
      <Card.Section>
        <Link
          className={"text-neutral-950"}
          href={productLink.href}
          as={productLink.as}
        >
          <Image src={image} alt={"product-card"} height={200} width={300} />
        </Link>
      </Card.Section>

      {/*<Badge*/}
      {/*  autoContrast*/}
      {/*  className={classes.rating}*/}
      {/*  color={available ? "green" : "red"}*/}
      {/*  size={"xs"}*/}
      {/*>*/}
      {/*  {available ? "В наличии" : "Нет в наличии"}*/}
      {/*</Badge>*/}

      <Link
        className={"text-neutral-950"}
        href={productLink.href}
        as={productLink.as}
      >
        <Text
          className={classes.title}
          fw={500}
          component="a"
          truncate={"end"}
          lineClamp={2}
        >
          {title}
        </Text>
      </Link>

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
            <ActionIcon
              className={classes.action}
              size="md"
              onClick={addProduct}
            >
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
