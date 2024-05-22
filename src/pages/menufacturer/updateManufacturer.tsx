import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import useCreateManufecturerData from "./hooks/useCreateManufectureData";
import { Loader2Icon } from "lucide-react";
import { useParams } from "react-router-dom";

const UpdateManufacturer = () => {
  const { manuId } = useParams();
  const { loading, getManufacturerById, updateManufacturer } =
    useCreateManufecturerData();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    shopName: "",
    email: "",
    mobileNumber: "",
    address: "",
    ownerName: "",
    whatsappNumber: "",
    mou: "",
  });

  const fetchData = async (id: string) => {
    const data = await getManufacturerById(id);
    if (!!data) setFormData(data);
    //TODO: redirect to '/'
  };

  useEffect(() => {
    if (!!manuId) fetchData(manuId);
    //eslint-disable-next-line
  }, [manuId]);

  const renderFormData = (
    name: string,
    title: string,
    placeholder: string,
    value: any,
    onChange: (value: any) => void,
    isRequired: boolean,
    type: string = "text"
  ) => {
    return (
      <div className='grid w-full items-center gap-1.5'>
        <Label htmlFor={title}>
          {title}
          {isRequired && (
            <span className='text-sm font-bold text-red-600'>*</span>
          )}{" "}
        </Label>
        <Input
          name={name}
          type={type}
          id={title}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      </div>
    );
  };

  const handleValueChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const renderForm = () => {
    return (
      <div className='w-full flex flex-col justify-center items-center '>
        <div className='w-full grid grid-cols-1 gap-6 my-2 sm:grid-cols-2'>
          {renderFormData(
            "name",
            "Manufecturer Name",
            "Enter  Name",
            formData?.name,
            (value: any) => handleValueChange("name", value),
            true
          )}
          {renderFormData(
            "shopName",
            "Brand/industry Name",
            "Enter  Name",
            formData?.shopName,
            (value: any) => handleValueChange("shopName", value),
            true
          )}
        </div>

        <div className='w-full grid grid-cols-1 gap-6 my-2 sm:grid-cols-2'>
          {renderFormData(
            "name",
            "Email",
            "abc@example.com",
            formData?.email,
            (value: any) => handleValueChange("email", value),
            false
          )}
          {renderFormData(
            "mobileNumber",
            "Mobile Number",
            "01xxxxxxxxxx",
            formData?.mobileNumber,
            (value: any) => handleValueChange("mobileNumber", value),
            true
          )}
        </div>
        <div className='w-full grid grid-cols-1 gap-6 my-2 sm:grid-cols-2'>
          {renderFormData(
            "ownerName",
            "Representative Name",
            "Enter Name",
            formData?.ownerName,
            (value: any) => handleValueChange("ownerName", value),
            true
          )}
          {renderFormData(
            "whatsappNumber",
            "Whatsapp Number",
            "01xxxxxxxxxx",
            formData?.whatsappNumber,
            (value: any) => handleValueChange("whatsappNumber", value),
            true
          )}
        </div>
        <div className='w-full my-2'>
          {renderFormData(
            "address",
            "Address",
            "location",
            formData?.address,
            (value: any) => handleValueChange("address", value),
            true
          )}
        </div>
        <div className='w-full my-2'>
          {renderFormData(
            "mou",
            "Enter MOU document link",
            "mou",
            formData?.mou,
            (value: any) => handleValueChange("mou", value),
            true
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className='w-full mx-0 sm:w-[60vw] sm:mx-auto'>
      <CardHeader>
        <CardTitle>Update Manufecturer Information</CardTitle>
      </CardHeader>
      <CardContent>{renderForm()}</CardContent>
      <CardFooter>
        <div className='w-full flex justify-center items-center sm:justify-end'>
          <Button
            className='w-full sm:w-auto'
            variant='default'
            disabled={loading}
            onClick={() => updateManufacturer(formData)}>
            {loading ? "Updating..." : "Update"}{" "}
            {loading && <Loader2Icon className='w-5 h-5 animate-spin' />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UpdateManufacturer;
