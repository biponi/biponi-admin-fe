import { LifeBuoy, SquareUser, Triangle } from "lucide-react";

import { Button } from "../components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { navItems } from "../utils/navItem";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navigateToRoute = (link: string) => {
    navigate(link);
  };
  return (
    <aside className='inset-y fixed  left-0 z-20 flex h-full flex-col border-r'>
      <div className='border-b p-2'>
        <Button variant='outline' size='icon' aria-label='Home'>
          <Triangle className='size-5 fill-foreground' />
        </Button>
      </div>
      <nav className='grid gap-1 p-2'>
        {navItems.map((item) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-lg bg-muted'
                aria-label='Playground'
                onClick={() => navigateToRoute(item?.link)}>
                {item?.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right' sideOffset={5}>
              {item?.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className='mt-auto grid gap-1 p-2'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='mt-auto rounded-lg'
              aria-label='Help'>
              <LifeBuoy className='size-5' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='right' sideOffset={5}>
            Help
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              className='mt-auto rounded-lg'
              aria-label='Account'>
              <SquareUser className='size-5' />
            </Button>
          </TooltipTrigger>
          <TooltipContent side='right' sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Navbar;
