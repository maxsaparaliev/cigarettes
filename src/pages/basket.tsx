import { Group, List, Mark, Space, Title } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketData } from "@/store/basket/selectors";
import { BasketCard } from "@/components/basket-card/basket-card";
import { LOCALSTORAGE_KEYS } from "@/constants/constants";
import React, { useEffect } from "react";
import { getBasketData } from "@/store/basket/reducers";
import { GetInTouch } from "@/components/get-in-touch/get-in-touch";

const Basket = () => {
  const dispatch = useDispatch();
  const basketData = useSelector(selectBasketData);

  useEffect(() => {
    const localStorageBasketData = localStorage.getItem(
      LOCALSTORAGE_KEYS.ITEMS,
    );

    dispatch(getBasketData(JSON.parse(localStorageBasketData || "")));
  }, []);

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
        <List.Item>Clone or download repository from GitHub</List.Item>
        <List.Item>Install dependencies with yarn</List.Item>
        <List.Item>To start development server run npm start command</List.Item>
        <List.Item>
          Run tests to make sure your changes do not break the build
        </List.Item>
        <List.Item>Submit a pull request once you are done</List.Item>
      </List>
      <Space h={"md"} />
      <Title order={2}>Корзина</Title>
      <Space h={"md"} />
      {basketData?.map((data) => <BasketCard product={data} />)}
      <Space h={"md"} />
      <Group justify={"end"}>
        <Title order={3}>
          Итого: <Mark color="gray">{totalPrice}₽</Mark>
        </Title>
      </Group>
      <Space h={"md"} />
      <Title order={2}>Оформить заказ</Title>
      <Space h={"xl"} />
      <GetInTouch total={totalPrice} />
    </div>
  );
};

export default Basket;
