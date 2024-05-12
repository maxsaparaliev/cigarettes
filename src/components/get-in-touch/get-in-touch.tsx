import {
  Button,
  Flex,
  Group,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useRef } from "react";
import { useForm } from "@mantine/form";
import emailjs from "@emailjs/browser";
import { notifications } from "@mantine/notifications";
import { NOTIFICATION } from "@/constants/constants";
import { useSelector } from "react-redux";
import { selectBasketData } from "@/store/basket/selectors";

type TGetInTouch = {
  total: number;
};

export const GetInTouch: React.FC<TGetInTouch> = ({ total }) => {
  const formRef = useRef();
  const basketData = useSelector(selectBasketData);
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      products: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Некорректный email"),
      name: (value) => (value.length > 0 ? null : "Введите Имя"),
    },
  });

  const selectedProducts = basketData
    .map((item) => `${item.title} количество: ${item.amount}`)
    .join(", ");
  const onSubmit = (values: any) => {
    form.setValues((values) => ({
      ...values,
      products: `${selectedProducts}, Всего: ${total} руб.`,
    }));
    emailjs
      .sendForm("service_stag0ib", "template_0vzm4jw", formRef.current!, {
        publicKey: "UzujTRjKObn0agy1-",
      })
      .then(() => {
        form.reset();
        notifications.show(NOTIFICATION.sended);
      });
  };

  return (
    <Flex justify={"center"} className={"pb-20 pt-14"}>
      <form
        ref={formRef as any}
        onSubmit={form.onSubmit(onSubmit)}
        className={"w-full md:w-8/12"}
      >
        <Title order={2} size="h1" fw={700} ta="center">
          Оформить заказ
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            label="Имя"
            placeholder="Ваше имя"
            name="name"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Почта"
            placeholder="Ваш email"
            name="email"
            {...form.getInputProps("email")}
          />
        </SimpleGrid>

        <TextInput
          label="Телефон"
          placeholder="Телефон"
          mt="lg"
          name="phone"
          required
          {...form.getInputProps("phone")}
        />
        <Textarea
          mt="lg"
          label="Сообщение"
          placeholder="Ваши пожелания"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          {...form.getInputProps("message")}
        />
        <input
          type={"hidden"}
          required={false}
          name={"products"}
          value={`${selectedProducts}, Всего: ${total} руб.`}
        />

        <Group justify="center" mt="xl">
          <Button type="submit" size="sm" color={"indigo"}>
            Отправить
          </Button>
        </Group>
      </form>
    </Flex>
  );
};
