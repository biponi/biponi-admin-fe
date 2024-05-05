import * as React from "react";

import { Card, CardContent } from "../components/ui/card";
import { File } from "lucide-react";

const EmptyProductCard = ({ text = "No Product Found" }) => {
  return (
    <Card className='w-full'>
      <CardContent>
        <div className='flex items-center flex-col mt-2'>
          <File className='w-10 h-10' />
          <span className='text-base text-gray-900 font-semibold mt-3'>
            {text}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyProductCard;
