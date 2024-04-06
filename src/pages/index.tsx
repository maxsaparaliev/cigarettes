import {
  ProductCard,
  TProductData,
} from "@/components/product-card/product-card";
import { Center, ComboboxItem, Flex, SimpleGrid, Space } from "@mantine/core";
import { Sorting } from "@/components/sorting/sorting";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/api";
import { PAGE_SIZE } from "@/constants/constants";
import { Pagination } from "@/components/pagination/pagination";
import { useDispatch } from "react-redux";
import { increment } from "@/store/reducers/reducers";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<TProductData[] | null>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getProducts(currentPage).then(({ data: products, count, error }) => {
      setData(products);
      setTotalPages(Math.ceil(count! / PAGE_SIZE));
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSorting = (value: string | null, option: ComboboxItem) => {
    dispatch(increment());
    console.log(option, "option");
  };
  return (
    <>
      <Flex justify={"flex-end"}>
        <Sorting handler={handleSorting} />
      </Flex>
      <Space h="md" />
      <SimpleGrid cols={3}>
        {data?.map((product) => (
          <ProductCard key={product.id} data={product} />
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
