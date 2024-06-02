import {
  Card,
  Center,
  Group,
  Image,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import classes from "./product-card.module.scss";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToBasket, removeFromBasket} from "@/store/basket/reducers";
import {notifications} from "@mantine/notifications";
import Link from "next/link";
import cn from "classnames";
import {selectBasketData} from "@/store/basket/selectors";
import {NOTIFICATION} from "@/constants/constants";
import MetaHead from "../meta-head/meta-head";

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
  pack: string;
  price: number;
  strength: string;
};

type Props = {
  product: TProductData;
};
export const ProductCard: React.FC<Props> = ({product}) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const basketData = useSelector(selectBasketData);

  const {
    country,
    id,
    available,
    capacity,
    created_at,
    description,
    manufacturer,
    pack,
    price,
    image,
    title,
    strength,
  } = product;

  const isAddedToFav = basketData.find((product) => product.id === id);

  const productLink = {
    href: "/product/[productId]",
    as: `/product/${id}`,
  };

  const addProduct = () => {
    if (!isAddedToFav) {
      dispatch(addToBasket({...product, amount: 1}));
      notifications.show(NOTIFICATION.added);
    }
    if (isAddedToFav) {
      dispatch(removeFromBasket(id));
      notifications.show(NOTIFICATION.removed);
    }
  };

  return (
    <>
      <Card shadow={"md"} radius="xs" className={cn([classes.card])}>
        <Card.Section className={"h-full flex items-center"}>
          <Link
            className={"text-neutral-950 h-full"}
            href={productLink.href}
            as={productLink.as}
          >
            <Image
              src={image}
              alt={"product-card"}
              height={200}
              width={300}
              className={"h-full"}
            />
          </Link>
        </Card.Section>

        <Group>
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
            <UnstyledButton>
              <Text
                component={"a"}
                variant="transparent"
                td={"underlined"}
                onClick={addProduct}
                color={isAddedToFav ? "red" : "cyan"}
              >
                <p>{isAddedToFav ? "удалить из корзины" : "в корзину"}</p>
              </Text>
            </UnstyledButton>
          </Group>
        </Group>
      </Card>
    </>
  );
};
