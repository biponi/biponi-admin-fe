import { useState } from "react";
import { GetManufacturerList } from "../../../api/manufecturer";

const useManufacturerList = () => {
  const [manufacturers, setManufacturer] = useState([]);
  const [manufacturerStaticList, setManufacturerStaticList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchmanufacturerList = async () => {
    setLoading(true);
    const response = await GetManufacturerList();
    setLoading(false);
    if (response.success) {
      setManufacturer(response?.data);
      setManufacturerStaticList(response?.data);
    }
  };

  const searchManufacturer = (query: string) => {
    const filtered = manufacturerStaticList.filter((data: any) =>
      data?.name.toLowerCase().includes(query)
    );
    setManufacturer(filtered);
  };

  return {
    loading,
    manufacturers,
    searchManufacturer,
    fetchmanufacturerList,
  };
};

export default useManufacturerList;
