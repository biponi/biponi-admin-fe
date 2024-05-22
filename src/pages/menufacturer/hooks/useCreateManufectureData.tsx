import { useState } from "react";
import { useToast } from "../../../components/ui/use-toast";
import { IManufectureCreate } from "../interface";
import {
  AddManufacturer,
  FetchManufacturerById,
  UpdateManufacturerById,
} from "../../../api/manufecturer";

const useCreateManufecturerData = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const createManufacturer = async (manufecturerData: IManufectureCreate) => {
    if (
      !manufecturerData?.name ||
      !manufecturerData?.ownerName ||
      !manufecturerData?.mobileNumber ||
      !manufecturerData?.address ||
      !manufecturerData?.whatsappNumber
    ) {
      toast({
        variant: "destructive",
        title: "Wrong Input",
        description: "Please enter all the required fields",
      });
    } else {
      setLoading(true);
      const manufacturerSchema = {
        name: manufecturerData?.name,
        shopName: manufecturerData?.shopName,
        email: manufecturerData?.email,
        mobileNumber: manufecturerData?.mobileNumber,
        location: {
          address: manufecturerData?.address,
        },
        ownerName: manufecturerData?.ownerName,
        whatsapp: manufecturerData?.whatsappNumber,
        mou: manufecturerData?.mou,
      };
      const response = await AddManufacturer(manufacturerSchema);
      setLoading(false);
      if (response?.success) {
        toast({
          variant: "default",
          title: "Congratulations",
          description: "New manufecturer added successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Manufacturer Addition failed",
          description: response.error,
        });
      }
    }
  };

  const updateManufacturer = async (manufecturerData: any) => {
    if (!!manufecturerData) {
      const manufacturerSchema = {
        id: manufecturerData?.id,
        name: manufecturerData?.name,
        shopName: manufecturerData?.shopName,
        email: manufecturerData?.email,
        mobileNumber: manufecturerData?.mobileNumber,
        location: {
          address: manufecturerData?.address,
        },
        ownerName: manufecturerData?.ownerName,
        whatsapp: manufecturerData?.whatsappNumber,
        mou: manufecturerData?.mou,
      };
      const response = await UpdateManufacturerById(manufacturerSchema);
      if (response?.success) {
        return response?.data;
      } else {
        toast({ variant: "destructive", title: response?.error });
      }
    }
  };

  const getManufacturerById = async (manuId: string) => {
    if (!!manuId) {
      const response = await FetchManufacturerById(manuId);
      if (response?.success) {
        return response?.data;
      } else {
        toast({ variant: "destructive", title: response?.error });
        return null;
      }
    } else return null;
  };

  return {
    loading,
    createManufacturer,
    updateManufacturer,
    getManufacturerById,
  };
};

export default useCreateManufecturerData;
