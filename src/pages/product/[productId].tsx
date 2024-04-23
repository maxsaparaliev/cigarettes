import {
  Button,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getProduct } from "@/store/product/thunks";
import { selectProduct } from "@/store/product/selectors";
import { addToBasket } from "@/store/basket/reducers";
import { notifications } from "@mantine/notifications";
import { NOTIFICATION } from "@/constants/constants";
import { setProduct } from "@/store/product/reducers";

const DetailPage = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const router = useRouter();

  const addProduct = () => {
    product && dispatch(addToBasket({ ...product, amount: 1 }));
    notifications.show(NOTIFICATION.added);
  };

  const queryKey = "productId";
  const queryValue =
    router.query[queryKey] ||
    router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));

  useEffect(() => {
    if (queryValue) {
      dispatch(getProduct({ id: parseInt(queryValue as string) }) as any);
    }
    return () => {
      dispatch(setProduct(null) as any);
    };
  }, [queryValue]);

  return (
    <div>
      <Flex
        direction={{
          base: "column",
          sm: "row",
        }}
      >
        <Center className={"md:w-1/2 w-full"}>
          <Image src={product?.image} />
        </Center>
        <Stack gap={"lg"} className={"md:w-1/2 w-full"}>
          <Title className={"pt-5 capitalize text-white"} order={2}>
            {product?.title}
          </Title>
          <Text size={"sm"} className={"text-white"}>
            {product?.description}
          </Text>
          <Group gap={"xl"} className={""}>
            <Stack>
              <Text size="sm" c={"white"}>
                Никотин
              </Text>
              <Text size="sm" c={"white"}>
                Смола
              </Text>
              <Text size="sm" c={"white"}>
                Страна
              </Text>
              <Text size="sm" c={"white"}>
                Бренд
              </Text>
              <Text size="sm" c={"white"}>
                Упаковка
              </Text>
              <Text size="sm" c={"white"}>
                В наличии
              </Text>
              <Text size="sm" c={"white"}>
                Пачка
              </Text>
            </Stack>
            <Stack>
              <Text size="sm" c={"white"}>
                {product?.nicotine}
              </Text>
              <Text size="sm" c={"white"}>
                {product?.tar}
              </Text>
              <Text size="sm" c={"white"}>
                {product?.country}
              </Text>
              <Text size="sm" c={"white"}>
                {product?.manufacturer}
              </Text>
              <Text size="sm" c={"white"}>
                {product?.capacity}
              </Text>
              <Text size="sm" c={"white"}>
                {product?.available ? "В Наличии" : "Нет на складе"}
              </Text>
              <Text size="sm" c={"white"}>
                {product?.pack}
              </Text>
            </Stack>
          </Group>
          <Title order={3} className={"text-white"}>
            {product?.price}₽
          </Title>
          <Flex>
            <Button onClick={addProduct}>Добавить в корзину</Button>
          </Flex>
        </Stack>
      </Flex>
    </div>
  );
};

export default DetailPage;
