import { ReactElement } from "react";

interface Props {
  title: string;
  children: ReactElement;
}

const MainView: React.FC<Props> = ({ title, children }) => {
  return (
    <div className='flex flex-col w-full'>
      <header className='sticky top-0 z-10 hidden sm:flex h-[53px] items-center gap-1 border-b bg-background px-4'>
        <h1 className='text-xl font-semibold'>{title}</h1>
      </header>
      <main className='overflow-auto p-2 w-full max-h-[85.67vh] h-[85.67vh] mt-[7.4vh]  sm:overflow-x-auto sm:overflow-y-auto '>
        {children}
      </main>
    </div>
  );
};

export default MainView;
