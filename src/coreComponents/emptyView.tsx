import { Dog, PlusCircle } from "lucide-react";
import { Button } from "../components/ui/button";

interface Props {
  header?: string;
  title: string;
  description: string;
  buttonText?: string;
  handleButtonClick?: () => void;
}

const EmptyView: React.FC<Props> = ({
  header,
  title,
  description,
  buttonText,
  handleButtonClick,
}) => {
  return (
    <main className='flex flex-1 flex-col h-full gap-4 p-4 lg:gap-6 lg:p-6'>
      {!!header && (
        <div className='flex items-center'>
          <h1 className='text-lg font-semibold md:text-2xl'>{header}</h1>
        </div>
      )}
      <div
        className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-10'
        x-chunk='dashboard-02-chunk-1'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <Dog className='mx-auto w-20 h-20' />
          <h3 className='text-2xl font-bold tracking-tight'>{title}</h3>
          <p className='text-sm text-muted-foreground'>{description}</p>
          {!!buttonText && !!handleButtonClick && (
            <Button className='mt-4' onClick={() => handleButtonClick()}>
              <PlusCircle className='w-5 h-5 mr-2' /> {buttonText}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default EmptyView;
