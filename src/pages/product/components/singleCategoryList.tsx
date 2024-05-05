import { MoreHorizontalIcon } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { TableCell, TableRow } from "../../../components/ui/table";
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
    <TableRow>
      <TableCell className='hidden sm:table-cell'>
        <img
          alt='img'
          className='aspect-square rounded-md object-cover'
          height='64'
          src={image ?? placeholderImage}
          width='64'
        />
      </TableCell>
      <TableCell className='font-medium'>{name}</TableCell>
      <TableCell>
        <Badge variant={active ? "outline" : "destructive"}>
          {active ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell>{totalProduct}</TableCell>
      <TableCell className='hidden md:table-cell'>{discount}</TableCell>
      {/* <TableCell className='hidden md:table-cell'>
        2023-07-12 10:42 AM
      </TableCell> */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup='true' size='icon' variant='ghost'>
              <MoreHorizontalIcon className='h-4 w-4' />
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
      </TableCell>
      {discardDialog()}
    </TableRow>
  );
};

export default SingleCategoryItem;
