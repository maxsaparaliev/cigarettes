import { Group, List, Space, Title } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectBasketData } from "@/store/basket/selectors";
import { BasketCard } from "@/components/basket-card/basket-card";
import React from "react";
import { GetInTouch } from "@/components/get-in-touch/get-in-touch";

const Basket = () => {
  const basketData = useSelector(selectBasketData);

  const totalPrice = basketData.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.amount,
    0,
  );
  return (
    <div>
      <Title order={2}>Доставка</Title>
      <Space h={"md"} />
      <List>
        <List.Item>Доставка: Бесплатная</List.Item>
        <List.Item>Способ оплаты: Наличными курьеру</List.Item>
      </List>
      <Space h={"md"} />
      <Title order={2}>Корзина</Title>
      <Space h={"md"} />
      {basketData?.map((data) => <BasketCard product={data} key={data.id} />)}
      <Space h={"md"} />
      <Group justify={"end"}>
        <Title order={3}>Итого: {totalPrice}₽</Title>
      </Group>
      <Space h={"xl"} />
      <GetInTouch total={totalPrice} />
    </div>
  );
};

export default Basket;
