import {
  CircleCheck,
  MapPin,
  MoreHorizontalIcon,
  TimerReset,
  Truck,
} from "lucide-react";
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

interface Props {
  id: string;
  customerName: string;
  CustomerPhoneNumber: string;
  status: string;
  district: string;
  totalPrice: number;
  paid: number;
  updatedAt: string;
  remaining: number;
  handleViewDetails: () => void;
  handleUpdateOrder: (id: string) => void;
  deleteExistingOrder: (id: string) => void;
}

const SingleItem: React.FC<Props> = ({
  id,
  customerName,
  CustomerPhoneNumber,
  status,
  totalPrice,
  district,
  paid,
  remaining,
  updatedAt,
  handleViewDetails,
  handleUpdateOrder,
  deleteExistingOrder,
}) => {
  const dialogBtn = useRef(null);

  const discardDialog = () => {
    return (
      <CustomAlertDialog
        title='Are You Sure?'
        description={`Deleting #${id}?`}
        onSubmit={() => {
          deleteExistingOrder(id);
        }}>
        <Button className='hidden' ref={dialogBtn}>
          show dialog
        </Button>
      </CustomAlertDialog>
    );
  };
  return (
    <TableRow onClick={() => handleViewDetails()}>
      <TableCell className='hidden sm:table-cell'>{id}</TableCell>
      <TableCell className='hidden sm:table-cell'>{customerName}</TableCell>
      <TableCell className='font-medium'>{CustomerPhoneNumber}</TableCell>
      <TableCell>
        <Badge variant='outline' className='py-1 px-3'>
          {status === "processing" ? (
            <TimerReset className='w-4 h-4 mr-2' />
          ) : status === "shipping" ? (
            <Truck className='w-4 h-4 mr-2' />
          ) : (
            <CircleCheck className='w-4 h-4 mr-2' />
          )}
          {status.toUpperCase()}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant='outline' className='py-1 px-3'>
          <MapPin className='w-4 h-4 mr-2' />
          {district}
        </Badge>
      </TableCell>
      <TableCell>{totalPrice}</TableCell>
      <TableCell>{paid}</TableCell>
      <TableCell className='hidden md:table-cell'>{remaining}</TableCell>
      <TableCell className='hidden '>
        {dayjs(updatedAt).format("DD-MM-YYYY HH:mm:ss")}
      </TableCell>
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
            <DropdownMenuItem onClick={() => handleUpdateOrder(id)}>
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
