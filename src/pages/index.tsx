import { ProductCard } from "@/components/product-card/product-card";
import { Center, ComboboxItem, Flex, SimpleGrid, Space } from "@mantine/core";
import { Sorting } from "@/components/sorting/sorting";
import React, { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getManufacturers } from "@/store/common/thunks";
import { getProducts } from "@/store/data/thunks";
import {
  selectCurrentPage,
  selectData,
  selectTotalPages,
} from "@/store/data/selectors";
import { setCurrentPage } from "@/store/data/reducers";
import { SORT_VALUES } from "@/constants/constants";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);

  const [sorting, setSorting] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getManufacturers() as any);
    dispatch(getCountries() as any);
  }, []);

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, sorting }) as any);
  }, [currentPage, sorting]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSorting = (value: string | null, option: ComboboxItem) => {
    setSorting(SORT_VALUES[option.value]);
  };
  return (
    <>
      <Flex justify={"flex-end"}>
        <Sorting handler={handleSorting} />
      </Flex>
      <Space h="md" />
      <SimpleGrid cols={3}>
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
      <Center style={{ padding: "20px 0" }}>
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      </Center>
    </>
  );
};

export default Home;
