import { Skeleton } from "@mantine/core";
import React from "react";

type SkeletonCardType = {
  amount: number;
};
export const SkeletonCard: React.FC<SkeletonCardType> = ({ amount }) => {
  const skeletons = Array(amount | 0)
    .fill(0)
    .map((e, i) => i + 1);
  return skeletons.map((item, idx) => (
    <Skeleton animate={true} h={512} w={311} />
  ));
};
