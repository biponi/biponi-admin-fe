import { ReactElement } from "react";
import { Settings } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Drawer,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
  DrawerContent,
  DrawerDescription,
} from "../components/ui/drawer";

interface Props {
  title: string;
  icon: ReactElement;
  description?: string;
  children: ReactElement;
}

const DrawerComponent: React.FC<Props> = ({
  icon,
  title,
  children,
  description,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          {!!icon && icon}
          {!icon && (
            <>
              <Settings className='size-4' />
              <span className='sr-only'>Settings</span>
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className='max-h-[80vh]'>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {!!description && (
            <DrawerDescription>{description}</DrawerDescription>
          )}
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
