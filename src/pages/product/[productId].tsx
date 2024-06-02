import {
  Button,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getProduct} from "@/store/product/thunks";
import {selectProduct} from "@/store/product/selectors";
import {addToBasket} from "@/store/basket/reducers";
import {notifications} from "@mantine/notifications";
import {NOTIFICATION} from "@/constants/constants";
import {setProduct} from "@/store/product/reducers";
import MetaHead from "../../components/meta-head/meta-head";

const DetailPage = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const router = useRouter();

  const addProduct = () => {
    product && dispatch(addToBasket({...product, amount: 1}));
    notifications.show(NOTIFICATION.added);
  };

  const queryKey = "productId";
  const queryValue =
    router.query[queryKey] ||
    router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));

  useEffect(() => {
    if (queryValue) {
      dispatch(getProduct({id: parseInt(queryValue as string)}) as any);
    }
    return () => {
      dispatch(setProduct(null) as any);
    };
  }, [queryValue]);

  return (
    <div className={"h-full mt-10"}>
      <MetaHead title={product?.title}/>
      {!product ? (
        <Center className={"mt-16"}>
          <Loader color="indigo"/>
        </Center>
      ) : (
        <Flex
          direction={{
            base: "column",
            sm: "row",
          }}
          gap={"xl"}
        >
          <Center className={"md:w-1/2 w-full"}>
            <Image src={product?.image}/>
          </Center>
          <Stack gap={"lg"} className={"md:w-1/2 w-full"}>
            <Title className={"pt-5 capitalize "} order={2}>
              {product?.title}
            </Title>
            <Text size={"sm"}>{product?.description}</Text>
            <Group gap={"xl"} className={""}>
              <Stack>
                <Text size="sm">Крепость</Text>
                <Text size="sm">Страна</Text>
                <Text size="sm">Бренд</Text>
                <Text size="sm">Упаковка</Text>
                <Text size="sm">В наличии</Text>
                <Text size="sm">Пачка</Text>
              </Stack>
              <Stack>
                <Text size="sm">{product?.strength || ""}</Text>
                <Text size="sm">{product?.country}</Text>
                <Text size="sm">{product?.manufacturer}</Text>
                <Text size="sm">{product?.capacity}</Text>
                <Text size="sm">
                  {product?.available ? "В Наличии" : "Нет на складе"}
                </Text>
                <Text size="sm">{product?.pack}</Text>
              </Stack>
            </Group>
            <Title order={3}>{product?.price}₽</Title>
            <Flex>
              <Button onClick={addProduct} color={"indigo"}>
                Добавить в корзину
              </Button>
            </Flex>
          </Stack>
        </Flex>
      )}
    </div>
  );
};

export default DetailPage;
