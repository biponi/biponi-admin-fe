import React, { ReactElement } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";

interface Props {
  title: string;
  description: string;
  children?: ReactElement;
  cancelButtonText?: string;
  submitButtonText?: string;
  onCancel?: () => void;
  onSubmit: () => void;
}

const CustomAlertDialog: React.FC<Props> = ({
  title,
  description,
  cancelButtonText = "Cancel",
  submitButtonText = "Submit",
  onCancel = () => {},
  onSubmit,
  children,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {!!children && children}
        {!children && <Button variant='outline'>Show Dialog</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>
            {submitButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
