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
  selectProductsLoading,
  selectTotalPages,
} from "@/store/data/selectors";
import { setCurrentPage } from "@/store/data/reducers";
import { PAGE_SIZE, SORT_VALUES } from "@/constants/constants";
import { SkeletonCard } from "@/components/skeleton-card/skeleton-card";
import { useStorageBasket } from "@/hooks/useStorageBasket";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectData);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectProductsLoading);

  const [sorting, setSorting] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getManufacturers() as any);
    dispatch(getCountries() as any);
  }, []);

  useStorageBasket();

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, sorting }) as any);
  }, [currentPage, sorting]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSorting = (value: string | null, option: ComboboxItem) => {
    setSorting(SORT_VALUES[option.value]);
  };

  const renderItems = () => {
    if (isLoading) {
      return <SkeletonCard amount={PAGE_SIZE} />;
    }
    return products?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <>
      <Flex justify={"flex-end"}>
        <Sorting handler={handleSorting} />
      </Flex>
      <Space h="md" />
      <SimpleGrid
        spacing={{ base: "xs", md: "md" }}
        cols={{ base: 2, xs: 2, md: 3 }}
      >
        {renderItems()}
      </SimpleGrid>
      <Space h={"xl"} />
      <Center style={{ padding: "20px 0" }}>
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={handlePageChange}
        />
      </Center>
      <Space h={"md"} />
    </>
  );
};

export default Home;
