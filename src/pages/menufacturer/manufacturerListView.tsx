import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import useManufacturerList from "./hooks/useManufacturerlist";
import EmptyView from "../../coreComponents/emptyView";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  BanIcon,
  ExternalLink,
  Loader2,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { IManufectureData } from "./interface";
import { useNavigate } from "react-router-dom";
import PlaceholderImage from "../../assets/mnt-image.png";

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

  const renderListView = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='hidden w-[100px] sm:table-cell'>
              <span className='sr-only'>Image</span>
            </TableHead>
            <TableHead className='text-[8px] sm:text-sm'>Name</TableHead>
            <TableHead className='hidden sm:table-cell'>
              Mobile Number
            </TableHead>
            <TableHead className='text-[8px] sm:text-sm'>Owner Name</TableHead>
            <TableHead className='text-[8px] sm:text-sm'>
              Whatsapp Number
            </TableHead>
            <TableHead className='text-[8px] sm:text-sm'>MOU</TableHead>
            <TableHead className='hidden sm:table-cell'>
              Total Products
            </TableHead>
            <TableHead className='text-[8px] sm:text-sm'>
              <span className='sr-only'>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {manufacturers.map(
            (manufacturer: IManufectureData, index: number) => (
              <TableRow key={index}>
                <TableCell className='hidden sm:table-cell'>
                  <img
                    alt='Product'
                    className='aspect-square rounded-md object-cover'
                    height='64'
                    src={PlaceholderImage}
                    width='64'
                  />
                </TableCell>
                <TableCell className='font-medium text-[10px] sm:text-sm'>
                  {manufacturer?.name}
                </TableCell>
                <TableCell className='text-[8px] sm:text-sm hidden sm:table-cell'>
                  <Badge variant='outline'>{manufacturer?.mobileNumber}</Badge>
                </TableCell>
                <TableCell className='text-[8px] sm:text-sm'>
                  <Badge className='hidden sm:inline-block' variant='default'>
                    {manufacturer?.ownerName}
                  </Badge>
                  <span className='inline sm:hidden text-[8px] sm:text-sm'>
                    {manufacturer?.ownerName}
                  </span>
                </TableCell>
                <TableCell className='text-[8px] sm:text-sm'>
                  {manufacturer?.whatsappNumber}
                </TableCell>
                <TableCell className='text-[8px] sm:text-sm'>
                  {!!manufacturer?.mou && (
                    <a href={manufacturer?.mou} target='blank'>
                      <ExternalLink className='w-5 h-5 hover:text-sky-500 cursor-pointer' />
                    </a>
                  )}
                  {!manufacturer?.mou && (
                    <BanIcon className='w-5 h-5 text-red-500 cursor-not-allowed' />
                  )}
                </TableCell>
                <TableCell className='text-[8px] sm:text-sm hidden sm:table-cell'>
                  {manufacturer?.productCount}
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup='true' size='icon' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigate(`/manufacturer/edit/${manufacturer?.id}`)
                        }>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
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
    <Card>
      <CardHeader>
        <CardTitle>Manufacturers</CardTitle>
        <CardDescription>
          <div className='grid w-full grid-cols-6 items-center gap-1.5'>
            <div className='w-full  col-span-5 sm:w-1/2 sm:col-span-4'>
              <Label htmlFor={"search"}>Search manufacturer</Label>
              <Input
                type='text'
                placeholder='Search'
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            <div className='w-full flex justify-end items-center col-span-1 sm:col-span-2'>
              <Button
                size='sm'
                className='h-7 ml-2 md:ml-0 md:gap-1 '
                onClick={() => navigate("/manufacturer/add")}>
                <PlusCircle className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Add Manufacturer
                </span>
              </Button>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>{mainView()}</CardContent>
    </Card>
  );
};

export default ManufacturerListView;
