import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './footer.module.scss';
import {Logotype} from "../../utils/logo";

const data = [
  {
    title: 'Информация',
    links: [
      { label: 'Каталог', link: '/' },
      { label: 'Оплата', link: '#' },
      { label: 'Доставка', link: '#' },
      { label: 'Контакты', link: '#' },
    ],
  },
  {
    title: 'Контакты',
    links: [
      { label: 'info@americancigarettes.ru', link: '#' },
      { label: '+79012221101', link: '#' },
    ],
  },
];

export const FooterLinks = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logotype />
          <Text size="xs" c="dimmed" className={classes.description}>
            Лучший выбор сигарет на ваш вкус
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 AmericanCigarettes.ru All rights reserved.
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
