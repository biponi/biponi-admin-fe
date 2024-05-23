import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../../../api/product";
import { useToast } from "../../../components/ui/use-toast";
import { deleteProduct, searchProducts } from "../../../api";
import useThrottleEffect from "../../../customHook/useThrottle";

export const useProductList = () => {
  const { toast } = useToast();
  const [productFetching, setProductFetching] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageNum, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedManufacturer, setSelectedManufacturer] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 20;

  useThrottleEffect(
    () => {
      if (selectedCategory === "all" && selectedManufacturer === "all")
        getProductList();
      else getProductListByCategoryId();
      //eslint-disable-next-line
    },
    [currentPageNum, selectedCategory, selectedManufacturer],
    1000
  );

  // useEffect(() => {
  //   setCurrentPage(-1);
  // }, [selectedCategory]);

  // useEffect(() => {
  //   setCurrentPage(-1);
  // }, [selectedManufacturer]);

  useEffect(() => {
    if (searchQuery !== "") searchProductByQuery();
    //eslint-disable-next-line
  }, [searchQuery]);

  const getProductList = async () => {
    setProductFetching(true);
    const response = await getProducts(limit, currentPageNum);
    if (response?.success && !!response?.data) {
      const { totalProducts, totalPages, currentPage, products } =
        response?.data;
      setTotalPages(totalPages);
      if (currentPageNum !== currentPage) setCurrentPage(Number(currentPage));
      setTotalProducts(totalProducts);
      //@ts-ignore
      setProducts([...products]);
    } else {
      toast({
        variant: "destructive",
        title: "Product Error",
        description: response?.error,
      });
    }
    setProductFetching(false);
  };

  const getProductListByCategoryId = async () => {
    setProductFetching(true);
    const response = await getProductsByCategory(
      selectedCategory,
      selectedManufacturer,
      currentPageNum,
      limit
    );
    if (response?.success && !!response?.data) {
      const { totalProducts, totalPages, currentPage, products } =
        response?.data;
      setTotalPages(totalPages);
      if (currentPageNum !== currentPage) setCurrentPage(Number(currentPage));
      setTotalProducts(totalProducts);
      //@ts-ignore
      setProducts([...products]);
    } else {
      toast({
        variant: "destructive",
        title: "Product Error",
        description: response?.error,
      });
    }
    setProductFetching(false);
  };

  const searchProductByQuery = async () => {
    const response = await searchProducts(searchQuery);
    if (response?.success) {
      //@ts-ignore
      setProducts(response.data);
    }
  };

  const deleteProductData = async (id: string) => {
    const response = await deleteProduct(id);
    if (response?.success) {
      toast({
        title: "Product Deleted",
        description: response?.data,
      });
      //@ts-ignore
      setProducts(products.filter((product) => product?.id !== id));
    } else {
      toast({
        variant: "destructive",
        title: "Product Error",
        description: response?.error,
      });
    }
  };

  const updateCurrentPage = (increaseBy: number) => {
    setCurrentPage(currentPageNum + increaseBy);
  };

  return {
    limit,
    products,
    totalPages,
    totalProducts,
    getProductList,
    currentPageNum,
    setSearchQuery,
    productFetching,
    selectedCategory,
    deleteProductData,
    updateCurrentPage,
    setSelectedCategory,
    selectedManufacturer,
    setSelectedManufacturer,
    getProductListByCategoryId,
  };
};
