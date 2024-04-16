import { Group, Select, SelectProps, Text } from "@mantine/core";
import { IconSortDescending2 } from "@tabler/icons-react";
import React from "react";
import { SORTINGS } from "@/constants/constants";

type Props = {
  handler: SelectProps["onChange"];
};
export const Sorting: React.FC<Props> = ({ handler }) => {
  const icon = <IconSortDescending2 stroke={1} />;
  return (
    <Group>
      <Text fw={500} className={"text-dimmed"}>
        Сортировать
      </Text>
      <Select
        placeholder="Сортировать"
        data={[
          { value: SORTINGS.DEFAULT, label: "По умолчанию" },
          { value: SORTINGS.TITLE_ASCENDING, label: "Наименование А-Я" },
          { value: SORTINGS.TITLE_DESCENDING, label: "Наименование Я-А" },
          { value: SORTINGS.PRICE_ASCENDING, label: "Цена по возрастанию" },
          { value: SORTINGS.PRICE_DESCENDING, label: "Цена по убыванию" },
        ]}
        allowDeselect={false}
        leftSection={icon}
        size={"xs"}
        onChange={handler}
      />
    </Group>
  );
};
