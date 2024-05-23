import { Button } from "../../../components/ui/button";
import {
  Edit2Icon,
  Settings,
  ShoppingCartIcon,
  Trash2Icon,
} from "lucide-react";
import CustomAlertDialog from "../../../coreComponents/OptionModal";
import { useRef } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../../../components/ui/drawer";
interface Props {
  id: string;
  image: string;
  title: string;
  quantity: number;
  unitPrice: number;
  handleUpdateProduct: (id: string) => void;
  deleteExistingProduct: (id: string) => void;
}

const SingleProductItemMobileView: React.FC<Props> = ({
  id,
  image,
  title,
  quantity,
  unitPrice,
  handleUpdateProduct,
  deleteExistingProduct,
}) => {
  const dialogBtn = useRef(null);

  const discardDialog = () => {
    return (
      <CustomAlertDialog
        title='Are You Sure?'
        description={`Deleting ${title}?`}
        onSubmit={() => {
          deleteExistingProduct(id);
        }}>
        <Button className='hidden' ref={dialogBtn}>
          show dialog
        </Button>
      </CustomAlertDialog>
    );
  };
  return (
    <li key={id} className='relative'>
      <div className='group aspect-h-7 aspect-w-10 block w-full overflow-hidden bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100'>
        <img
          src={image}
          alt=''
          className='pointer-events-none object-cover group-hover:opacity-75'
        />
        {/* <button type='button' className='absolute inset-0 focus:outline-none'>
          <span className='sr-only'>View details for {file.title}</span>
        </button> */}
      </div>
      <div className='p-2'>
        <div className='grid w-full grid-cols-2 gap-1 mt-2'>
          <p className='pointer-events-none  col-span-1 truncate text-[10px] font-medium text-gray-900'>
            {title}
          </p>
          <p className='pointer-events-none col-span-1 text-[10px]  text-sm font-medium text-gray-500 text-right'>
            <ShoppingCartIcon className='w-2 h-2 inline' /> {quantity}
          </p>
        </div>
        <div className='grid grid-cols-2 gap-1 h-4'>
          <p className='pointer-events-none  col-span-1 text-[10px]  truncate text-sm font-medium text-gray-900'>
            ৳{unitPrice}
          </p>
          <Drawer>
            <DrawerTrigger asChild className='col-span-1'>
              <Button
                aria-haspopup='true'
                size='icon'
                variant='ghost'
                className='ml-auto items-start justify-end pt-1'>
                <Settings className='h-4 w-4 text-right' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>Product Settings</DrawerHeader>
              <div className='w-full flex justify-center items-center gap-4 pb-28'>
                <Button
                  variant='default'
                  size='lg'
                  onClick={() => handleUpdateProduct(id)}>
                  <Edit2Icon className='w-4 h-4 mr-2' />
                  Edit
                </Button>
                <Button
                  variant='destructive'
                  size='lg'
                  onClick={() => {
                    //@ts-ignore
                    if (!!dialogBtn) dialogBtn.current?.click();
                  }}>
                  <Trash2Icon className='w-4 h-4 mr-2' />
                  Delete
                </Button>
              </div>
              {/* <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem> */}
            </DrawerContent>
          </Drawer>
          {discardDialog()}
        </div>
      </div>
    </li>
  );
};

export default SingleProductItemMobileView;
