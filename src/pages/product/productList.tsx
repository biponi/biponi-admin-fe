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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useProductList } from "./hooks/useProductList";
import SingleItem from "./components/singleProductList";
import EmptyView from "../../coreComponents/emptyView";
import { IProduct } from "./interface";
import DefaultLoading from "../../coreComponents/defaultLoading";
import useCategory from "./hooks/useCategory";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import useDebounce from "../../customHook/useDebounce";
import { useNavigate } from "react-router-dom";

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
  } = useProductList();
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategory();
  const [inputValue, setInputValue] = useState<string>("");

  const debounceHandler = useDebounce(inputValue, 500);

  useEffect(() => {
    fetchCategories();
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
      />
    );
  };

  const renderProductListView = () => {
    return (
      <Tabs defaultValue='all'>
        <div className='flex items-center w-full'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='inactive'>Inactive</TabsTrigger>
            <TabsTrigger value='instock'>In Stock</TabsTrigger>
            <TabsTrigger value='outofstock'>Out of stock</TabsTrigger>
          </TabsList>
          <div className='ml-auto flex items-center gap-2'>
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
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={selectedCategory === "all"}
                  onClick={() => setSelectedCategory("all")}>
                  All
                </DropdownMenuCheckboxItem>
                {categories.map((category, index) => (
                  <DropdownMenuCheckboxItem
                    checked={selectedCategory === category?.id}
                    onClick={() => setSelectedCategory(category.id)}>
                    {category?.name}
                  </DropdownMenuCheckboxItem>
                ))}
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
              className='h-7 gap-1'
              onClick={() => navigate("/product/create")}>
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Product
              </span>
            </Button>
          </div>
        </div>

        <Card x-chunk='dashboard-06-chunk-0' className='mt-4'>
          <CardHeader>
            <div className='flex w-full justify-between'>
              <div className='mr-auto'>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage your products and view their sales performance.
                </CardDescription>
              </div>
              <div className='ml-auto'>
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
          <CardContent>
            <TabsContent value='all'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                      <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Total Stock
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Last Updated at
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product: IProduct, index: number) => (
                    <SingleItem
                      key={index}
                      id={product?.id}
                      sku={product?.sku}
                      image={product?.thumbnail}
                      title={product?.name}
                      categoryName={product?.categoryName ?? "Not Added"}
                      active={product?.active}
                      quantity={product?.quantity}
                      unitPrice={product?.unitPrice}
                      handleUpdateProduct={handleEditProduct}
                      deleteExistingProduct={deleteProductData}
                      updatedAt={product?.timestamps?.updatedAt}
                    />
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value='active'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                      <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Total Stock
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Last Updated at
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .filter((product: IProduct) => product.active)
                    .map((product: IProduct, index: number) => (
                      <SingleItem
                        key={index}
                        id={product?.id}
                        sku={product?.sku}
                        image={product?.thumbnail}
                        title={product?.name}
                        categoryName={product?.categoryName ?? "Not Added"}
                        active={product?.active}
                        quantity={product?.quantity}
                        unitPrice={product?.unitPrice}
                        handleUpdateProduct={handleEditProduct}
                        deleteExistingProduct={deleteProductData}
                        updatedAt={product?.timestamps?.updatedAt}
                      />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value='inactive'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                      <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Total Stock
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Last Updated at
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .filter((product: IProduct) => !product.active)
                    .map((product: IProduct, index: number) => (
                      <SingleItem
                        key={index}
                        id={product?.id}
                        sku={product?.sku}
                        image={product?.thumbnail}
                        title={product?.name}
                        categoryName={product?.categoryName ?? "Not Added"}
                        active={product?.active}
                        quantity={product?.quantity}
                        unitPrice={product?.unitPrice}
                        handleUpdateProduct={handleEditProduct}
                        deleteExistingProduct={deleteProductData}
                        updatedAt={product?.timestamps?.updatedAt}
                      />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value='instock'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                      <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Total Stock
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Last Updated at
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .filter((product: IProduct) => product.quantity > 3)
                    .map((product: IProduct, index: number) => (
                      <SingleItem
                        key={index}
                        id={product?.id}
                        sku={product?.sku}
                        image={product?.thumbnail}
                        title={product?.name}
                        categoryName={product?.categoryName ?? "Not Added"}
                        active={product?.active}
                        quantity={product?.quantity}
                        unitPrice={product?.unitPrice}
                        handleUpdateProduct={handleEditProduct}
                        deleteExistingProduct={deleteProductData}
                        updatedAt={product?.timestamps?.updatedAt}
                      />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value='outofstock'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='hidden w-[100px] sm:table-cell'>
                      <span className='sr-only'>Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Total Stock
                    </TableHead>
                    <TableHead className='hidden md:table-cell'>
                      Last Updated at
                    </TableHead>
                    <TableHead>
                      <span className='sr-only'>Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products
                    .filter((product: IProduct) => product.quantity <= 3)
                    .map((product: IProduct, index: number) => (
                      <SingleItem
                        key={index}
                        sku={product?.sku}
                        id={product?.id}
                        image={product?.thumbnail}
                        title={product?.name}
                        categoryName={product?.categoryName ?? "Not Added"}
                        active={product?.active}
                        quantity={product?.quantity}
                        unitPrice={product?.unitPrice}
                        handleUpdateProduct={handleEditProduct}
                        deleteExistingProduct={deleteProductData}
                        updatedAt={product?.timestamps?.updatedAt}
                      />
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </CardContent>
          {inputValue === "" && (
            <CardFooter>
              <div className='w-full flex justify-between items-center'>
                <div className='text-xs text-muted-foreground'>
                  Showing{" "}
                  <strong>{`${
                    (Number(currentPageNum) - 1) * limit + 1
                  }-${Math.min(
                    Number(currentPageNum) * limit,
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
            </CardFooter>
          )}
        </Card>
      </Tabs>
    );
  };

  const mainView = () => {
    if (productFetching) {
      return <DefaultLoading />;
    } else if (inputValue !== "" || (!!products && products.length > 0)) {
      return renderProductListView();
    } else {
      return renderEmptyView();
    }
  };

  return <div className='w-full md:w-[95vw]'>{mainView()}</div>;
};

export default ProductList;
