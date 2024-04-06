import React from "react";
import { Pagination as MantinePagination } from "@mantine/core";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onChange,
}) => <MantinePagination value={current} total={total} onChange={onChange} />;
