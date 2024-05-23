import { SettingsIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import placeholderImage from "../../../assets/placeholder.svg";
import CustomAlertDialog from "../../../coreComponents/OptionModal";
import { useRef } from "react";
interface Props {
  id: string;
  image: string;
  name: string;
  active: boolean;
  discount: number;
  totalProduct: number;
  handleEditBtnClick: () => void;
  deleteExistingCategory: (id: string, name: string) => Promise<boolean>;
}

const SingleCategoryItem: React.FC<Props> = ({
  id,
  image,
  name,
  active,
  discount,
  totalProduct,
  handleEditBtnClick,
  deleteExistingCategory,
}) => {
  const dialogBtn = useRef(null);

  const discardDialog = () => {
    return (
      <CustomAlertDialog
        title='Are You Sure?'
        description='Deleting this category?'
        onSubmit={() => {
          deleteExistingCategory(id, name);
        }}>
        <Button className='hidden' ref={dialogBtn}>
          show dialog
        </Button>
      </CustomAlertDialog>
    );
  };
  return (
    <li key={id} className='col-span-1 flex rounded-md'>
      <img
        alt='category'
        src={image ?? placeholderImage}
        className='flex w-16 flex-shrink-0 items-center justify-center rounded-l-md border border-gray-200 '
      />
      <div className='flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white'>
        <div className='flex-1 truncate px-2 py-2 text-sm'>
          <span className='font-medium text-sm text-gray-900 hover:text-gray-600'>
            {name}
          </span>
          <p className='text-gray-500 text-xs'>{totalProduct} Products</p>
        </div>
        <div className='flex-shrink-0 pr-2'>
          <button
            type='button'
            className='inline-flex h-8 w-4 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
            <span className='sr-only'>Open options</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup='true'
                  size='icon'
                  variant='ghost'
                  className='px-2'>
                  <SettingsIcon
                    className='h-5 w-5 text-gray-500'
                    aria-hidden='true'
                  />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleEditBtnClick()}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (!!dialogBtn) {
                      //@ts-ignore
                      dialogBtn?.current?.click();
                    }
                  }}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </button>
        </div>
      </div>
      {discardDialog()}
    </li>
  );
};

export default SingleCategoryItem;
