import axios from "./axios";
import config from "../utils/config";
import { handleApiError } from ".";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const AddManufacturer = async (
  newManufecturerData: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<any>(
      config.manufecturer.manufecturerAdd(),
      newManufecturerData
    );
    if (response.status === 200) {
      return { success: true, data: response.data?.data };
    } else {
      return {
        success: false,
        error: response.data.error || "Failed to fetch manufacturer",
      };
    }
  } catch (error: any) {
    console.error("Error creating category:", error.message);
    return handleApiError(error);
  }
};

export const FetchManufacturerById = async (
  manuId: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.get<any>(
      config.manufecturer.getManufecturerById(manuId)
    );
    if (response.status === 200) {
      return { success: true, data: response.data?.data };
    } else {
      return {
        success: false,
        error: response.data.error || "Failed to fetch manufacturer",
      };
    }
  } catch (error: any) {
    console.error("Error creating category:", error.message);
    return handleApiError(error);
  }
};

export const UpdateManufacturerById = async (
  manufacturerData: any
): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.post<any>(
      config.manufecturer.updateManufecturerById(manufacturerData?.id)
    );
    if (response.status === 200) {
      return { success: true, data: response.data?.data };
    } else {
      return {
        success: false,
        error: response.data.error || "Failed to fetch manufacturer",
      };
    }
  } catch (error: any) {
    console.error("Error creating category:", error.message);
    return handleApiError(error);
  }
};

export const GetManufacturerList = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.get<any>(
      config.manufecturer.manufecturerList()
    );
    if (response.status === 200) {
      return { success: true, data: response.data?.data };
    } else {
      return {
        success: false,
        error: response.data.error || "Failed to fetch manufacturer",
      };
    }
  } catch (error: any) {
    console.error("Error creating category:", error.message);
    return handleApiError(error);
  }
};
