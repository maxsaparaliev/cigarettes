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

type TGetInTouch = {
  total: number;
};

export const GetInTouch: React.FC<TGetInTouch> = ({ total }) => {
  const formRef = useRef();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Некорректный email"),
      name: (value) => (value.length > 0 ? null : "Введите Имя"),
    },
  });

  const templateParams = {
    name: "",
    email: "",
    phone: "",
  };

  console.log(formRef.current, "current");

  const onSubmit = (values: any) => {
    console.log(values, "values");
    emailjs
      .sendForm("service_stag0ib", "template_0vzm4jw", formRef.current!, {
        publicKey: "UzujTRjKObn0agy1-",
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response);
        },
        (error) => {
          console.log("FAILED...", error.text);
        },
      );
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

        <Group justify="center" mt="xl">
          <Button type="submit" size="sm" color={"indigo"}>
            Отправить
          </Button>
        </Group>
      </form>
    </Flex>
  );
};
