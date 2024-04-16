import {
  Center,
  Divider,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import React from "react";
import classes from "./basket-card.module.scss";
import {
  BasketData,
  handleAmount,
  THandleAmount,
} from "@/store/basket/reducers";
import { CONDITIONS } from "@/constants/constants";
import { useDispatch } from "react-redux";

type TBasketCard = {
  product: BasketData;
};
export const BasketCard: React.FC<TBasketCard> = ({ product }) => {
  const dispatch = useDispatch();
  const handleAmountButton = (arg: THandleAmount) => {
    dispatch(handleAmount(arg));
  };

  return (
    <>
      <Flex>
        <Group className={classes.basketContainer}>
          <Image radius="md" h={90} src={product.image} />
          <Stack gap={"xs"}>
            <Text fw={700} className={"text-dimmed"}>
              {product.title}
            </Text>
            <Group>
              <Text c="dimmed">{product.manufacturer}</Text>
              <Text c="dimmed">{product.country}</Text>
            </Group>
          </Stack>
        </Group>
        <Group className={classes.basketContainer} grow>
          <Center>
            <div className={classes.basketCard}>
              <UnstyledButton
                className={[classes.basketCardButton].join(" ")}
                onClick={() =>
                  handleAmountButton({
                    condition: CONDITIONS.PLUS,
                    id: product.id,
                  })
                }
              >
                +
              </UnstyledButton>
              <Divider orientation="vertical" />
              <Text fw={700} className={classes.basketCardText}>
                {product.amount}
              </Text>
              <Divider orientation="vertical" />
              <UnstyledButton
                className={[classes.basketCardButton].join(" ")}
                onClick={() =>
                  handleAmountButton({
                    id: product.id,
                    condition: CONDITIONS.MINUS,
                  })
                }
              >
                -
              </UnstyledButton>
            </div>
          </Center>
        </Group>
        <Group className={classes.basketContainer} grow>
          <Center>
            <Text fw={700} className={"text-white"}>
              {product.price * product.amount}₽
            </Text>
          </Center>
        </Group>
      </Flex>
    </>
  );
};
