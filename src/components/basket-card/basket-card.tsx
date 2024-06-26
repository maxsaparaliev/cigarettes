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
import cn from "classnames";

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
      <Flex
        direction={{
          base: "column",
          sm: "row",
        }}
        justify={"center"}
        align={"center"}
        className={cn(["mb-3", "pb-3"])}
      >
        <Group className={classes.basketContainer} grow>
          <Image radius="md" h={90} src={product.image} />
          <Stack gap={"xs"}>
            <Text fw={700}>{product.title}</Text>
            <Group>
              <Text>{product.manufacturer}</Text>
              <Text>{product.country}</Text>
            </Group>
          </Stack>
        </Group>
        <Group className={cn([classes.basketContainer, "py-4 sm:py-0"])} grow>
          <Center>
            <div className={classes.basketCard}>
              <UnstyledButton
                className={classes.basketCardButton}
                onClick={() =>
                  handleAmountButton({
                    id: product.id,
                    condition: CONDITIONS.MINUS,
                  })
                }
              >
                -
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
                    condition: CONDITIONS.PLUS,
                    id: product.id,
                  })
                }
              >
                +
              </UnstyledButton>
            </div>
          </Center>
        </Group>
        <Group className={classes.basketContainer} grow>
          <Center>
            <Text fw={700}>{product.price * product.amount}₽</Text>
          </Center>
        </Group>
      </Flex>
      <Divider />
    </>
  );
};
