import { useEffect, useState } from "react";

import { Input } from "../../components/ui/input";
import useManufacturerList from "./hooks/useManufacturerlist";
import EmptyView from "../../coreComponents/emptyView";

import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  BoxIcon,
  Edit3Icon,
  Loader2,
  MailIcon,
  PhoneCallIcon,
  PlusCircle,
} from "lucide-react";
import { IManufectureData } from "./interface";
import { useNavigate } from "react-router-dom";
import PlaceholderImage from "../../assets/mnt-image.png";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";

const ManufacturerListView = () => {
  const navigate = useNavigate();
  const { loading, fetchmanufacturerList, searchManufacturer, manufacturers } =
    useManufacturerList();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!!query) searchManufacturer(query);
    else fetchmanufacturerList();
    //eslint-disable-next-line
  }, [query]);
  const renderEmptyView = () => {
    return (
      <EmptyView
        title='You have manufacturer'
        description='You can start adding manufacturer'
        buttonText='Add New Manufacturer'
        handleButtonClick={() => {
          //@ts-ignore
          navigate("/manufacturer/add");
        }}
      />
    );
  };

  const renderDrawerView = (manufacturer: IManufectureData) => {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <div className='flex w-full items-center justify-between space-x-2 p-2'>
            <div className='flex-1 truncate'>
              <div className='flex items-center'>
                <h3 className='truncate text-sm font-medium text-gray-900'>
                  {manufacturer?.name}
                </h3>
                <span className='inline-flex ml-2 flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                  <BoxIcon className='w-3 h-3 ' /> {manufacturer?.productCount}
                </span>
              </div>
              <p className='mt-1 truncate text-sm text-gray-500'>
                {manufacturer?.ownerName}
              </p>
            </div>
            <img
              className='h-10 w-10 flex-shrink-0 rounded-full bg-gray-300'
              src={PlaceholderImage}
              alt='manufacturer'
            />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{manufacturer?.name}</DrawerTitle>
          </DrawerHeader>
          <div className='p-10 flex justify-center items-center'>
            <Button variant='default' size='lg' className='gap-1'>
              <Edit3Icon className='h-4 w-4' />
              Edit
            </Button>
            <Button variant='destructive' size='lg' className='gap-1 ml-2'>
              <Edit3Icon className='h-4 w-4' />
              Delete
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  };

  const renderListView = () => {
    return (
      <ul className='grid grid-cols-1 gap-4  py-2'>
        {manufacturers.map((manufacturer: IManufectureData, index: number) => (
          <li
            key={index}
            className=' divide-y divide-gray-200 rounded-lg bg-white shadow border border-gray-100'>
            {renderDrawerView(manufacturer)}
            <div>
              <div className='-mt-px flex divide-x divide-gray-200'>
                <div className='flex w-0 flex-1'>
                  <a
                    href={`mailto:${manufacturer?.email}`}
                    className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900'>
                    <MailIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    Email
                  </a>
                </div>
                <div className='-ml-px flex w-0 flex-1'>
                  <a
                    href={`tel:${manufacturer?.mobileNumber}`}
                    className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900'>
                    <PhoneCallIcon
                      className='h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const mainView = () => {
    if (loading) {
      return (
        <div className='p-28 flex justify-center items-center'>
          <Badge variant='outline'>
            Loading...
            <Loader2 className='w-5 h-5 animate-spin' />
          </Badge>
        </div>
      );
    } else {
      return !!manufacturers && manufacturers?.length > 0
        ? renderListView()
        : renderEmptyView();
    }
  };

  return (
    <div className='w-full max-h-[87vh] overflow-y-auto'>
      <h2 className='font-bold'>Manufacturers</h2>
      <div className='grid w-full grid-cols-6 items-center gap-2 my-2'>
        <div className='w-full  col-span-5'>
          <Input
            type='text'
            placeholder='Search manufacturer'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div className='w-full flex justify-end items-center col-span-1 '>
          <Button
            size='sm'
            className='h-9 ml-2 md:ml-0 md:gap-1 '
            onClick={() => navigate("/manufacturer/add")}>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
              Add Manufacturer
            </span>
          </Button>
        </div>
      </div>
      {mainView()}
    </div>
  );
};

export default ManufacturerListView;
