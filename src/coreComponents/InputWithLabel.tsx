import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

interface Props {
  type: "email" | "number" | "text" | "file";
  id: string;
  label?: string;
  placeholder?: string;
  value: string | number | null;
  onChange: (value: string | number | null) => void;
}

const InputWithLabel: React.FC<Props> = ({
  type,
  id,
  label,
  placeholder,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (!!onChange && inputValue !== value) {
      handleChange(inputValue);
    }
    //eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (value !== inputValue) setInputValue(value);
    //eslint-disable-next-line
  }, [value]);

  //@ts-ignore
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      {!!label && <Label htmlFor={id}>{label}</Label>}
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        //@ts-ignore
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputWithLabel;
