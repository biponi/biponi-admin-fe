import { Disc3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";

export function SkeletonCard({
  title = "Loading",
  description = "Please wait...",
}) {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className='flex items-center'>
              {title} <Disc3 className='w-5 h-5 ml-2 animate-spin' />
            </div>
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col space-y-3'>
            <Skeleton className='h-[125px] w-[250px] rounded-xl' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[250px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
