import { IconHeart } from "@tabler/icons-react";
import {
  ActionIcon,
  Card,
  Center,
  Group,
  Image,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import classes from "./product-card.module.scss";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "@/store/basket/reducers";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import cn from "classnames";
import { selectBasketData } from "@/store/basket/selectors";
import { NOTIFICATION } from "@/constants/constants";

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
  const basketData = useSelector(selectBasketData);

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

  const isAddedToFav = basketData.find((product) => product.id === id);

  const productLink = {
    href: "/product/[productId]",
    as: `/product/${id}`,
  };

  const addProduct = () => {
    if (!isAddedToFav) {
      dispatch(addToBasket({ ...product, amount: 1 }));
      notifications.show(NOTIFICATION.added);
    }
    if (isAddedToFav) {
      dispatch(removeFromBasket(id));
      notifications.show(NOTIFICATION.removed);
    }
  };

  return (
    <Card radius="xs" className={cn([classes.card, "bg-dark"])}>
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
          className={cn([classes.title, "text-dark"])}
          fw={500}
          component="a"
          truncate={"end"}
          lineClamp={2}
          c={"white"}
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
          <Text fw={700} c={"white"}>
            {price} руб
          </Text>
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
              variant="filled"
              color={"#2a2a2a"}
            >
              <IconHeart
                stroke={1}
                color={
                  isAddedToFav ? theme.colors.red[5] : theme.colors.blue[6]
                }
              />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Card>
  );
};
