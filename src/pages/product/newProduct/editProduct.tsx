import { PlusCircle, Upload } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Textarea } from "../../../components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Switch } from "../../../components/ui/switch";
import PlaceHolderImage from "../../../assets/placeholder.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import CustomAlertDialog from "../../../coreComponents/OptionModal";

import { ICategory, IProductUpdateData, IVariation } from "../interface";
import { IManufectureData } from "../../menufacturer/interface";

const defaultVariation = {
  id: 0,
  size: "",
  color: "",
  name: "",
  title: "",
  sku: "",
  quantity: 0,
  unitPrice: 0,
};

interface Props {
  productData: IProductUpdateData;
  updateProduct: (productData: IProductUpdateData) => Promise<boolean>;
  categories: ICategory[];
  manufacturers: IManufectureData[];
}

const EditProduct: React.FC<Props> = ({
  productData,
  updateProduct,
  categories,
  manufacturers,
}) => {
  const [formData, updateFormData] = useState<IProductUpdateData>(productData);
  const [hasVariation, setHasVariation] = useState(false);
  const [isSameUnitPrice, setSameunitPrice] = useState(true);

  useEffect(() => {
    if (!!productData) {
      updateFormData(productData);
      if (!!productData?.variation && productData?.variation?.length > 0) {
        setHasVariation(true);
      }
    }
  }, [productData]);

  const fileRef = useRef(null);
  const dialogBtn = useRef(null);
  const updateDialogBtn = useRef(null);

  // Handle form field changes
  //@ts-ignore
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
    if (name === "sku") {
      onSkuChange(value);
    } else if (name === "unitPrice" && isSameUnitPrice) {
      onUnitPriceChange(value);
    }
  };

  const onSkuChange = (value: string) => {
    if (!!formData.variation && formData.variation.length > 0) {
      updateFormData({
        ...formData,
        sku: value,
        variation: formData.variation.map((variation: IVariation) => {
          return { ...variation, sku: `${value}-${variation.id}` };
        }),
      });
    }
  };

  const onUnitPriceChange = (value: number) => {
    if (!!formData.variation && formData.variation.length > 0) {
      updateFormData({
        ...formData,
        variation: formData.variation.map((variation: IVariation) => {
          return { ...variation, unitPrice: value };
        }),
      });
    }
  };

  const addNewVariation = () => {
    let arr = [];
    if (formData.variation.length > 0) {
      arr = [...formData.variation];
      //@ts-ignore
      let id = formData.variation[formData.variation.length - 1].id + 1;
      arr.push({
        ...defaultVariation,
        id,
        sku: `${formData.sku}-${id}`,
      });
    } else {
      arr.push({ ...defaultVariation });
    }

    updateFormData({
      ...formData,
      //@ts-ignore
      variation: arr,
    });
  };

  const updateVariationData = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!!formData && index < formData?.variation.length) {
      const { name, value } = e.target;
      formData.variation[index] = {
        ...formData?.variation[index],
        [name]: value,
      };
      updateFormData({ ...formData });
    }

    if (formData.variation && formData?.variation.length > 0) {
      const totalQuantity = formData?.variation.reduce(
        (sum, variant) =>
          Number(sum) +
          (isNaN(Number(variant?.quantity)) ? 0 : Number(variant?.quantity)),
        0
      );
      updateFormData({
        ...formData,
        //@ts-ignore
        quantity: totalQuantity,
      });
    }
  };

  const handleSameUnitPrice = (value: boolean) => {
    setSameunitPrice(value);

    onUnitPriceChange(value ? formData.unitPrice : 0.0);
  };

  const renderVariationView = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>SKU</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className='w-[100px]'>Color</TableHead>
            <TableHead className='w-[100px]'>Size</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!formData.variation &&
            formData.variation.map((variation: IVariation, index: number) => (
              <TableRow>
                <TableCell className='font-semibold'>
                  {variation?.sku}
                </TableCell>
                <TableCell>
                  <Label htmlFor='stock-3' className='sr-only'>
                    Stock
                  </Label>
                  <Input
                    id='stock-3'
                    name='quantity'
                    onChange={(e) => updateVariationData(index, e)}
                    type='number'
                    value={variation.quantity}
                    defaultValue='32'
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor='price-3' className='sr-only'>
                    Unit Price
                  </Label>
                  <Input
                    disabled={isSameUnitPrice}
                    id='price-3'
                    className={`${
                      isSameUnitPrice ? "bg-gray-100" : "bg-white"
                    }`}
                    name='unitPrice'
                    onChange={(e) => updateVariationData(index, e)}
                    type='number'
                    value={variation.unitPrice}
                    defaultValue='99.99'
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor='price-3' className='sr-only'>
                    Color
                  </Label>
                  <Input
                    id='price-3'
                    name='color'
                    onChange={(e) => updateVariationData(index, e)}
                    type='text'
                    value={variation.color}
                    defaultValue='99.99'
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor='price-3' className='sr-only'>
                    Size
                  </Label>
                  <Input
                    id='price-3'
                    name='size'
                    onChange={(e) => updateVariationData(index, e)}
                    type='text'
                    value={variation.size}
                    defaultValue='99.99'
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  };

  const renderNoVariationView = () => {
    return "";
  };

  const discardDialog = () => {
    return (
      <CustomAlertDialog
        title='Are You Sure?'
        description='This will discard all the changes'
        onSubmit={() => {
          updateFormData(productData);
        }}>
        <Button className='hidden' ref={dialogBtn}>
          show dialog
        </Button>
      </CustomAlertDialog>
    );
  };

  const updateDiscardDialog = () => {
    return (
      <CustomAlertDialog
        title='Are You Sure?'
        description='You want to save the changes?'
        onSubmit={() => {
          updateProductAndExit();
        }}>
        <Button className='hidden' ref={updateDialogBtn}>
          show dialog
        </Button>
      </CustomAlertDialog>
    );
  };

  const updateProductAndExit = async () => {
    const response = await updateProduct({ ...formData });
    if (!!response) {
      // updateFormData({ ...defaultValue });
    }
  };

  return (
    <div className='w-full sm:w-full'>
      <div className='mx-auto grid max-w-full flex-1 auto-rows-max gap-4'>
        <div className='flex items-center gap-4'>
          <div className='hidden items-center gap-2 md:ml-auto md:flex'>
            <Button
              variant='outline'
              size='sm'
              //@ts-ignore
              onClick={() => !!dialogBtn && dialogBtn.current.click()}>
              Discard
            </Button>
            <Button
              size='sm'
              onClick={() =>
                //@ts-ignore
                !!updateDialogBtn && updateDialogBtn.current.click()
              }>
              Update Product
            </Button>
          </div>
        </div>
        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
            <Card x-chunk='dashboard-07-chunk-0'>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>Enter product information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      className='w-full'
                      value={formData?.name}
                      defaultValue='Enter a valid name'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                      id='description'
                      name='description'
                      defaultValue='Enter a valid description'
                      value={formData?.description}
                      className='min-h-32'
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-07-chunk-2'>
              <CardHeader>
                <CardTitle>Product Category, SKU & Unit Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6 sm:grid-cols-4'>
                  <div className='grid gap-3'>
                    <Label htmlFor='category'>Category</Label>
                    <Select
                      value={formData?.categoryId}
                      onValueChange={(value) => {
                        updateFormData({
                          ...formData,
                          categoryId: value,
                        });
                      }}>
                      <SelectTrigger id='category' aria-label='Select category'>
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                      <SelectContent>
                        {!!categories &&
                          categories.map((category: ICategory) => (
                            <SelectItem value={category?.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* <div className='grid gap-3'>
                    <Label htmlFor='subcategory'>Subcategory (optional)</Label>
                    <Select>
                      <SelectTrigger
                        id='subcategory'
                        aria-label='Select subcategory'>
                        <SelectValue placeholder='Select subcategory' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='t-shirts'>T-Shirts</SelectItem>
                        <SelectItem value='hoodies'>Hoodies</SelectItem>
                        <SelectItem value='sweatshirts'>Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}
                  <div className='grid gap-3'>
                    <Label htmlFor='product-sku'>Product Sku</Label>
                    <Input
                      id='product-sku'
                      name='sku'
                      type='text'
                      value={formData?.sku}
                      className='w-full'
                      defaultValue=''
                      onChange={handleChange}
                    />
                  </div>
                  <div className='grid gap-3'>
                    <Label htmlFor='sku'>Unit Price</Label>
                    <Input
                      id='product-unit-price'
                      name='unitPrice'
                      type='number'
                      className='w-full'
                      value={formData?.unitPrice}
                      defaultValue='0.00'
                      onChange={handleChange}
                      disabled={!isSameUnitPrice}
                    />
                  </div>

                  <div className='grid gap-3'>
                    <Label htmlFor='quantity'>Total Quntity</Label>
                    <Input
                      id='quantity'
                      name='quantity'
                      type='number'
                      value={formData?.quantity}
                      className={`w-full ${
                        hasVariation
                          ? "bg-gray-100 border-gray-300"
                          : "bg-white border-gray-200"
                      } `}
                      defaultValue='0.00'
                      onChange={handleChange}
                      disabled={hasVariation}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk='dashboard-07-chunk-1'>
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <Label htmlFor='airplane-mode'>Has Variation? </Label>
                      <span
                        className={`text-sm mx-2 ${
                          !hasVariation
                            ? "font-semibold text-gray-800 "
                            : "font-normal text-gray-600"
                        }`}>
                        No
                      </span>
                      <Switch
                        id='airplane-mode'
                        checked={hasVariation}
                        onCheckedChange={(value) => {
                          setHasVariation(value);
                        }}
                      />
                      <span
                        className={`text-sm mx-2 ${
                          hasVariation
                            ? "font-semibold text-gray-800 "
                            : "font-normal text-gray-600"
                        }`}>
                        Yes
                      </span>
                    </div>

                    {hasVariation && (
                      <div className='flex items-center ml-auto'>
                        <Label htmlFor='airplane-mode-01'>
                          Are Unit Prices Same?{" "}
                        </Label>
                        <span
                          className={`text-sm mx-2 ${
                            !isSameUnitPrice
                              ? "font-semibold text-gray-800 "
                              : "font-normal text-gray-600"
                          }`}>
                          No
                        </span>
                        <Switch
                          id='airplane-mode-01'
                          checked={isSameUnitPrice}
                          onCheckedChange={(value) => {
                            handleSameUnitPrice(value);
                          }}
                        />
                        <span
                          className={`text-sm mx-2 ${
                            isSameUnitPrice
                              ? "font-semibold text-gray-800 "
                              : "font-normal text-gray-600"
                          }`}>
                          Yes
                        </span>
                      </div>
                    )}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasVariation ? renderVariationView() : renderNoVariationView()}
              </CardContent>
              {hasVariation && (
                <CardFooter className='justify-center border-t p-4'>
                  <Button
                    size='sm'
                    variant='ghost'
                    className='gap-1'
                    onClick={() => addNewVariation()}>
                    <PlusCircle className='h-3.5 w-3.5' />
                    Add Variant
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
          <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
            <Card x-chunk='dashboard-07-chunk-3'>
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid gap-6'>
                  <div className='grid gap-3'>
                    <Label>Status</Label>
                    <Select
                      value={formData?.active ? "active" : "inactive"}
                      onValueChange={(value) => {
                        updateFormData({
                          ...formData,
                          active: value === "active",
                        });
                      }}>
                      <SelectTrigger id='status' aria-label='Select status'>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='active' className='text-green-500 '>
                          Active
                        </SelectItem>
                        <SelectItem value='inactive' className='text-red-500'>
                          Inactive
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='grid gap-3'>
                    <Label>Manufacturer</Label>
                    <Select
                      value={formData?.manu_id}
                      onValueChange={(value) => {
                        updateFormData({
                          ...formData,
                          manu_id: value,
                        });
                      }}>
                      <SelectTrigger id='status' aria-label='Select status'>
                        <SelectValue placeholder='Select Manufacturer' />
                      </SelectTrigger>
                      <SelectContent>
                        {manufacturers.map(
                          (manufacture: IManufectureData, index: number) => (
                            <SelectItem
                              key={manufacture?.id}
                              value={manufacture?.id}
                              className='text-green-500 '>
                              {manufacture?.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className='overflow-hidden' x-chunk='dashboard-07-chunk-4'>
              <CardHeader>
                <CardTitle>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-md font-semibold text-gray-800'>
                      Product Image
                    </h3>
                    <div className='ml-auto'>
                      <Input
                        id='picture'
                        type='file'
                        className='hidden'
                        ref={fileRef}
                        name='thumbnail'
                        onChange={(e) => {
                          //@ts-ignore
                          const file = e.target.files[0];
                          updateFormData({
                            ...formData,
                            thumbnail: file,
                          });
                        }}
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant='outline'
                            size='icon'
                            onClick={() => {
                              if (!!fileRef) {
                                //@ts-ignore
                                fileRef.current.click();
                              }
                            }}>
                            <Upload className='h-4 w-4' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side='right' sideOffset={5}>
                          Change Image
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardTitle>
                <CardDescription>
                  This is a visual representation of the product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-2'>
                  <img
                    alt='Product_image'
                    className='aspect-square w-full rounded-md object-fill'
                    height='200'
                    src={
                      !!formData?.thumbnail
                        ? typeof formData?.thumbnail === "string"
                          ? formData?.thumbnail
                          : URL.createObjectURL(formData?.thumbnail)
                        : PlaceHolderImage
                    }
                    width='200'
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='flex items-center justify-center gap-2 md:hidden'>
          <Button
            variant='outline'
            size='sm'
            //@ts-ignore
            onClick={() => !!dialogBtn && dialogBtn.current.click()}>
            Discard
          </Button>
          <Button
            size='sm'
            onClick={() =>
              //@ts-ignore
              !!updateDialogBtn && updateDialogBtn.current.click()
            }>
            Save Product
          </Button>
        </div>
      </div>
      {discardDialog()}
      {updateDiscardDialog()}
    </div>
  );
};

export default EditProduct;
