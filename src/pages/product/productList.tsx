import {
  ChevronLeft,
  ChevronRight,
  ListFilter,
  PlusCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "../../components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useProductList } from "./hooks/useProductList";
import EmptyView from "../../coreComponents/emptyView";
import { IProduct } from "./interface";
import DefaultLoading from "../../coreComponents/defaultLoading";
import useCategory from "./hooks/useCategory";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import useDebounce from "../../customHook/useDebounce";
import { useNavigate } from "react-router-dom";
import SingleProductItemMobileView from "./components/singleProductMobileView";
import useManufacturerList from "../menufacturer/hooks/useManufacturerlist";
import { IManufectureData } from "../menufacturer/interface";

interface Props {
  handleEditProduct: (id: string) => void;
}

const ProductList: React.FC<Props> = ({ handleEditProduct }) => {
  const {
    limit,
    productFetching,
    products,
    currentPageNum,
    totalPages,
    totalProducts,
    setSearchQuery,
    updateCurrentPage,
    selectedCategory,
    deleteProductData,
    setSelectedCategory,
    selectedManufacturer,
    setSelectedManufacturer,
  } = useProductList();
  const { manufacturers, fetchmanufacturerList } = useManufacturerList();
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategory();
  const [inputValue, setInputValue] = useState<string>("");
  const [catQuery, setCatQuery] = useState<string>("");

  const debounceHandler = useDebounce(inputValue, 500);

  useEffect(() => {
    fetchCategories();
    fetchmanufacturerList();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setSearchQuery(inputValue);
    //eslint-disable-next-line
  }, [debounceHandler]);

  const renderEmptyView = () => {
    return (
      <EmptyView
        title='You have no products'
        description='You can start selling as soon as you add a product.'
        buttonText='Add Product'
        handleButtonClick={() => navigate("/product/create")}
      />
    );
  };

  const renderButtonAndFilterView = () => {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='h-7 gap-1'>
              <ListFilter className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Input
              className='my-1'
              placeholder='Search'
              value={catQuery}
              onChange={(e) => setCatQuery(e.target.value)}
            />
            <div className='max-h-[150px] overflow-y-auto'>
              <DropdownMenuCheckboxItem
                checked={selectedCategory === "all"}
                onClick={() => setSelectedCategory("all")}>
                All
              </DropdownMenuCheckboxItem>
              {categories
                .filter((cat) =>
                  cat?.name.toLowerCase().includes(catQuery.toLowerCase())
                )
                .map((category, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={selectedCategory === category?.id}
                    onClick={() => setSelectedCategory(category.id)}>
                    {category?.name}
                  </DropdownMenuCheckboxItem>
                ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Manufacturer</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <div className='max-h-[150px] overflow-y-auto'>
              <DropdownMenuCheckboxItem
                checked={selectedManufacturer === "all"}
                onClick={() => setSelectedManufacturer("all")}>
                All
              </DropdownMenuCheckboxItem>
              {manufacturers.map((manufacturer: IManufectureData, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={selectedManufacturer === manufacturer?.id}
                  onClick={() => setSelectedManufacturer(manufacturer.id)}>
                  {manufacturer?.name}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Button size='sm' variant='outline' className='h-7 gap-1'>
              <File className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Export
              </span>
            </Button> */}
        <Button
          size='sm'
          className='h-7 ml-2 md:ml-0 md:gap-1 '
          onClick={() => navigate("/product/create")}>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Add Product
          </span>
        </Button>
      </>
    );
  };

  const renderMobileProductView = (productData: IProduct, key: number) => {
    return (
      <SingleProductItemMobileView
        key={key}
        id={productData?.id}
        image={productData?.thumbnail}
        title={productData?.name}
        quantity={productData?.quantity}
        unitPrice={productData?.unitPrice}
        handleUpdateProduct={handleEditProduct}
        deleteExistingProduct={deleteProductData}
      />
    );
  };

  const renderProductListView = () => {
    return (
      <Tabs defaultValue='all' className=' overflow-y-hidden '>
        <div className='flex flex-col items-center w-[90vw] md:w-full md:flex-row'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='inactive'>Inactive</TabsTrigger>
            <TabsTrigger value='instock'>In Stock</TabsTrigger>
            <TabsTrigger value='outofstock'>Out of stock</TabsTrigger>
          </TabsList>
          <div className='ml-auto hidden items-center gap-2 md:flex'>
            {renderButtonAndFilterView()}
          </div>
        </div>

        <Card
          x-chunk='dashboard-06-chunk-0'
          className=' mt-2 w-[90vw] md:mt-4 md:w-full'>
          <CardHeader>
            <div className='flex flex-col w-full justify-between md:flex-row  '>
              <div className='md:mr-auto'>
                <div className='flex items-center justify-between'>
                  <CardTitle>Products</CardTitle>
                  <div className='ml-auto md:hidden'>
                    {renderButtonAndFilterView()}
                  </div>
                </div>
                <CardDescription className='mt-2'>
                  Manage your products and view their sales performance.
                </CardDescription>
              </div>
              <div className=' mt-2 md:mt-0 md:ml-auto'>
                <Input
                  type='text'
                  placeholder='Search'
                  onChange={(event) => {
                    setInputValue(event.target.value);
                  }}
                />
              </div>
            </div>
          </CardHeader>
        </Card>
        <div className='w-full my-2 px-2 max-h-[52.4vh] overflow-y-auto'>
          <TabsContent value='all'>
            <ul className='grid grid-cols-3 gap-4 md:hidden sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
              {products.map((product: IProduct, index: number) =>
                renderMobileProductView(product, index)
              )}
            </ul>
          </TabsContent>
          <TabsContent value='active'>
            <ul className='grid grid-cols-2 gap-4 md:hidden sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
              {products
                .filter((product: IProduct) => product.active)
                .map((product: IProduct, index: number) =>
                  renderMobileProductView(product, index)
                )}
            </ul>
          </TabsContent>
          <TabsContent value='inactive'>
            <ul className='grid grid-cols-2 gap-4 md:hidden sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
              {products
                .filter((product: IProduct) => !product.active)
                .map((product: IProduct, index: number) =>
                  renderMobileProductView(product, index)
                )}
            </ul>
          </TabsContent>
          <TabsContent value='instock'>
            <ul className='grid grid-cols-2 gap-4 md:hidden sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
              {products
                .filter((product: IProduct) => product.quantity > 0)
                .map((product: IProduct, index: number) =>
                  renderMobileProductView(product, index)
                )}
            </ul>
          </TabsContent>
          <TabsContent value='outofstock'>
            <ul className='grid grid-cols-2 gap-4 md:hidden sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'>
              {products
                .filter((product: IProduct) => product.quantity <= 0)
                .map((product: IProduct, index: number) =>
                  renderMobileProductView(product, index)
                )}
            </ul>
          </TabsContent>
        </div>

        {inputValue === "" && (
          <div className='rounded-lg border border-gray-100 px-3 py-2'>
            <div className='w-full flex justify-between items-center'>
              <div className='text-xs text-muted-foreground'>
                Showing{" "}
                <strong>{`${
                  Math.max(Number(currentPageNum) - 1, 0) * limit + 1
                } to ${Math.min(
                  Math.max(Number(currentPageNum), 1) * limit,
                  totalProducts
                )}`}</strong>{" "}
                of <strong>{totalProducts}</strong> products
              </div>
              <div className='flex gap-2 items-center'>
                <Button
                  disabled={currentPageNum < 2}
                  variant='outline'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => updateCurrentPage(-1)}>
                  <ChevronLeft className='h-4 w-4' />
                  <span className='sr-only'>Back</span>
                </Button>

                <Button
                  disabled={currentPageNum >= totalPages}
                  variant='outline'
                  size='icon'
                  className='h-7 w-7'
                  onClick={() => updateCurrentPage(1)}>
                  <ChevronRight className='h-4 w-4' />
                  <span className='sr-only'>Next</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Tabs>
    );
  };

  const mainView = () => {
    if (productFetching) {
      return <DefaultLoading />;
    } else if (
      inputValue !== "" ||
      selectedCategory !== "all" ||
      selectedManufacturer !== "all" ||
      (!!products && products.length > 0)
    ) {
      return renderProductListView();
    } else {
      return renderEmptyView();
    }
  };

  return <div className='w-full md:w-full'>{mainView()}</div>;
};

export default ProductList;
