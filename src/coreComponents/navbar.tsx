import { LifeBuoy, PanelLeft, SquareUser, Triangle, User2 } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { navItems } from "../utils/navItem";
import { Link, useNavigate } from "react-router-dom";
import { BiponiLogo } from "../utils/contents";

const Navbar = () => {
  const navigate = useNavigate();
  const navigateToRoute = (link: string) => {
    navigate(link);
  };
  return (
    <>
      <aside className='inset-y fixed  left-0 z-20 hidden sm:flex h-full flex-col border-r'>
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
      <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:hidden sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='icon' variant='outline' className='sm:hidden'>
              <PanelLeft className='h-5 w-5' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='sm:max-w-xs'>
            <nav className='grid gap-6 text-lg font-medium'>
              <div className='border-b p-2'>
                <Button variant='outline' size='icon' aria-label='Home'>
                  <img
                    src={BiponiLogo}
                    className='size-5 fill-foreground'
                    alt='main-logo'
                  />
                </Button>
              </div>
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item?.link}
                  className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                  {item.icon}
                  {item.title}
                </Link>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='overflow-hidden rounded-full hidden'>
                    <User2 className='w-8 h-8' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
};

export default Navbar;
