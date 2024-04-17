import {
  Button,
  Flex,
  Group,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";

type TGetInTouch = {
  total: number;
};

export const GetInTouch: React.FC<TGetInTouch> = ({ total }) => {
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

  return (
    <Flex justify={"center"}>
      <form onSubmit={form.onSubmit(() => {})} className={"w-full md:w-8/12"}>
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
          <Button type="submit" size="md">
            Отправить
          </Button>
        </Group>
      </form>
    </Flex>
  );
};
