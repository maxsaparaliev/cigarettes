import {
  Button,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { ContactIconsList } from "./contact-icons";
import classes from "./get-in-touch.module.scss";
import React from "react";
import { useForm } from "@mantine/form";
import { IconAt, IconPhone, IconUserCircle } from "@tabler/icons-react";

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
    },
  });

  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts}>
          <Title order={3} fw={700} className={classes.titleDimmed} c="#fff">
            Информация
          </Title>

          <ContactIconsList total={total} />
        </div>

        <form
          className={classes.form}
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <Flex direction={"column"}>
            <Text fz="lg" fw={700} className={classes.title}>
              Оформить заказ
            </Text>
            <Text size={"sm"} c={"dimmed"} className={classes.titleDimmed}>
              С Вами свяжется наш сотрудник
            </Text>
          </Flex>

          <div className={classes.fields}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Имя"
                placeholder="Имя"
                leftSection={
                  <IconUserCircle width={18} height={18} stroke={1} />
                }
                {...form.getInputProps("name")}
              />
              <TextInput
                label="Почта"
                placeholder="example@gmail.com"
                required
                leftSection={<IconAt width={18} height={18} stroke={1} />}
                {...form.getInputProps("email")}
              />
            </SimpleGrid>

            <TextInput
              mt="md"
              label="Телефон"
              placeholder="Телефон"
              required
              leftSection={<IconPhone width={18} height={18} stroke={1} />}
              {...form.getInputProps("phone")}
            />

            <Textarea
              mt="md"
              label="Пожелания"
              placeholder="Ваше сообщение"
              minRows={6}
              {...form.getInputProps("message")}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control}>
                Send message
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
};
