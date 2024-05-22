import { FactoryIcon, MoreHorizontalIcon, PhoneCallIcon } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import dayjs from "dayjs";
import { TableCell, TableRow } from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useRef } from "react";
import CustomAlertDialog from "../../../coreComponents/OptionModal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../components/ui/hover-card";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { getInitialsWord } from "../../../utils/functions";

interface Props {
  id: string;
  sku: string;
  image: string;
  title: string;
  active: boolean;
  quantity: number;
  unitPrice: number;
  updatedAt: string;
  categoryName: string;
  manufacturerName: string;
  manufacturerNumber: string;
  handleUpdateProduct: (id: string) => void;
  deleteExistingProduct: (id: string) => void;
}

const SingleItem: React.FC<Props> = ({
  id,
  sku,
  image,
  title,
  active,
  quantity,
  unitPrice,
  updatedAt,
  categoryName,
  manufacturerName,
  manufacturerNumber,
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
  const HoverCardView = () => {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant='ghost'>
            <FactoryIcon className='w-5 h-5' />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className='w-[350px]'>
          <div className='flex justify-start w-full'>
            <Avatar className='mr-4'>
              <AvatarFallback>
                {getInitialsWord(manufacturerName)}
              </AvatarFallback>
            </Avatar>
            <div className='space-y-1 w-full flex-1'>
              <h4 className='text-sm font-semibold'>@{manufacturerName}</h4>
              <p className='text-sm'>
                <PhoneCallIcon className='w-4 h-4 mr-1 inline' />{" "}
                {manufacturerNumber}
              </p>
              <div className='flex items-center pt-2'>
                <FactoryIcon className='mr-2 h-4 w-4 opacity-70' />{" "}
                <span className='text-xs text-muted-foreground'>Onboarded</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };
  return (
    <TableRow>
      <TableCell className='hidden sm:table-cell'>
        <img
          alt='img'
          className='aspect-square rounded-md object-cover'
          height='64'
          src={image}
          width='64'
        />
      </TableCell>
      <TableCell className='font-medium'>{title}</TableCell>
      <TableCell>{sku}</TableCell>
      <TableCell>
        <Badge variant={active ? "outline" : "destructive"}>
          {active ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell>{categoryName}</TableCell>
      <TableCell>{unitPrice}</TableCell>
      <TableCell className='hidden md:table-cell'>{quantity}</TableCell>
      <TableCell className='hidden md:table-cell'>
        {dayjs(updatedAt).format("DD-MM-YYYY HH:mm:ss")}
      </TableCell>
      <TableCell>{HoverCardView()}</TableCell>
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
            <DropdownMenuItem onClick={() => handleUpdateProduct(id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                //@ts-ignore
                if (!!dialogBtn) dialogBtn.current?.click();
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

export default SingleItem;
