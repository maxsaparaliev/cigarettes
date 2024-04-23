import { Button, Container, Group, Text, Title } from "@mantine/core";
import classes from "../styles/custom404.module.scss";
import React from "react";
import { Illustration } from "@/components/illustration/illustration";
import Link from "next/link";

export default function Custom404() {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={"text-dimmed text-center py-10"}>
            Ничего не найдено
          </Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Страница которую вы запросили не существует.
          </Text>
          <Group justify="center" className={"pt-10 "}>
            <Button size="md">
              <Link className={"text-white"} href={"/"}>
                На главную
              </Link>
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
