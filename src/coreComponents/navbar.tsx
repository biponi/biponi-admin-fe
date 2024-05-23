import { LifeBuoy, SquareUser, Triangle, User2 } from "lucide-react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { navItems } from "../utils/navItem";
import { useNavigate } from "react-router-dom";
import { BiponiMainLogo } from "../utils/contents";
import useLoginAuth from "../pages/auth/hooks/useLoginAuth";

const Navbar: React.FC = () => {
  const { signOut } = useLoginAuth();
  const navigate = useNavigate();
  const navigateToRoute = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <aside className='fixed inset-y-0 left-0 z-20 hidden sm:flex h-full flex-col border-r'>
        <div className='border-b p-2'>
          <Button variant='outline' size='icon' aria-label='Home'>
            <Triangle className='size-5 fill-foreground' />
          </Button>
        </div>
        <nav className='grid gap-1 p-2'>
          {navItems
            .filter((nav) => nav.active)
            .map((item) => (
              <Tooltip key={item.link}>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-lg bg-muted'
                    aria-label={item.title}
                    onClick={() => navigateToRoute(item.link)}>
                    {item.icon}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={5}>
                  {item.title}
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='mt-auto rounded-lg'
                    aria-label='Account'>
                    <SquareUser className='size-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent side='right' sideOffset={5}>
              Account
            </TooltipContent>
          </Tooltip>
        </nav>
      </aside>

      <header className='fixed top-0 w-full z-30 flex h-[7.5vh] items-center gap-4 border-b bg-background px-4 sm:hidden sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
        <Button size='icon' variant='outline' className='sm:hidden' disabled>
          <img src={BiponiMainLogo} className='w-5 h-5' alt='main-logo' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='ml-auto'>
            <Button size='icon' variant='outline' className='sm:hidden'>
              <User2 className='w-5 h-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <footer className='fixed inset-x-0 bottom-0 z-20 flex sm:hidden h-[7.5vh] items-center justify-around bg-background border-t'>
        {navItems
          .filter((nav) => nav.active)
          .map((item) => (
            <Button
              key={item.link}
              variant={
                window.location.pathname.toLowerCase().includes(item.link)
                  ? "default"
                  : "outline"
              }
              size='icon'
              className='rounded-lg'
              aria-label={item.title}
              onClick={() => navigateToRoute(item.link)}>
              {item.icon}
            </Button>
          ))}
      </footer>
    </>
  );
};

export default Navbar;
