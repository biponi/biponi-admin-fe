import { searchOrders } from "../../../api/order";

const useOrder = () => {
  const getProductByQuery = async (query: string) => {
    const response = await searchOrders(query);
    if (response?.success) {
      return response?.data;
    } else return [];
  };
  return { getProductByQuery };
};

export default useOrder;
