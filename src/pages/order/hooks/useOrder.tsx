import { searchProducts } from "../../../api";

const useOrder = () => {
  const getProductByQuery = async (query: string) => {
    const response = await searchProducts(query);
    if (response?.success) {
      return response?.data;
    } else return [];
  };
  return { getProductByQuery };
};

export default useOrder;
