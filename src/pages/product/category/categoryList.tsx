import { PlusCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import SingleItem from "../components/singleCategoryList";
import EmptyView from "../../../coreComponents/emptyView";
import { ICategory } from "../interface";
import useCategory from "../hooks/useCategory";
import { useEffect, useState } from "react";
import { SkeletonCard } from "../../../coreComponents/sekeleton";
import UpdateCategory from "./updateCategory";

const CatergoryList = () => {
  const {
    loading,
    categories,
    fetchCategories,
    createCategory,
    editExistingCategory,
    deleteExistingCategory,
  } = useCategory();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!!selectedCategory) setOpenUpdateDialog(true);
  }, [selectedCategory]);

  const renderEmptyView = () => {
    return (
      <EmptyView
        title='You have no category'
        description='You can start adding product as soon as you add a category.'
        buttonText='Add New Category'
        handleButtonClick={() => {
          //@ts-ignore
          setOpenCreateDialog(true);
        }}
      />
    );
  };

  const renderCatergoryListView = () => {
    return (
      <Tabs defaultValue='all'>
        <div className='flex items-center w-full'>
          <TabsList>
            <TabsTrigger value='all'>All</TabsTrigger>
            <TabsTrigger value='active'>Active</TabsTrigger>
            <TabsTrigger value='inactive'>Inactive</TabsTrigger>
          </TabsList>
          <div className='ml-auto flex items-center'>
            <Button
              size='sm'
              className='h-7 gap-1'
              onClick={() => {
                //@ts-ignore
                setOpenCreateDialog(true);
              }}>
              <PlusCircle className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                Add Category
              </span>
            </Button>
          </div>
        </div>

        <div className='max-h-[79.5vh] overflow-y-auto'>
          {" "}
          <TabsContent value='all'>
            <div className='m-2 border-1 border-gray-100 rounded-md'>
              <div className='w-full flex justify-between items-center'>
                <h2 className='font-bold'>Categories</h2>
                <div className='text-xs text-muted-foreground'>
                  Showing <strong>{categories.length}</strong> categories
                </div>
              </div>
            </div>
            <ul className='mt-3 grid grid-cols-2 gap-4'>
              {categories.map((category: ICategory, index: number) => (
                <SingleItem
                  key={index}
                  id={category?.id}
                  image={category?.img}
                  name={category?.name}
                  active={category?.active}
                  discount={category?.discount}
                  totalProduct={category?.totalProducts}
                  handleEditBtnClick={() => {
                    setSelectedCategory(category);
                  }}
                  deleteExistingCategory={deleteExistingCategory}
                />
              ))}
            </ul>
          </TabsContent>
          <TabsContent value='active'>
            <div className='m-2 border-1 border-gray-100 rounded-md'>
              <div className='w-full flex justify-between items-center'>
                <h2 className='font-bold'>Categories</h2>
                <div className='text-xs text-muted-foreground'>
                  Showing{" "}
                  <strong>
                    {categories.filter((cat) => cat?.active).length}
                  </strong>{" "}
                  categories
                </div>
              </div>
            </div>
            <ul className='mt-3 grid grid-cols-2 gap-4'>
              {categories
                .filter((cat) => cat?.active)
                .map((category: ICategory, index: number) => (
                  <SingleItem
                    key={index}
                    id={category?.id}
                    image={category?.img}
                    name={category?.name}
                    active={category?.active}
                    discount={category?.discount}
                    totalProduct={category?.totalProducts}
                    handleEditBtnClick={() => {
                      setSelectedCategory(category);
                    }}
                    deleteExistingCategory={deleteExistingCategory}
                  />
                ))}
            </ul>
          </TabsContent>
          <TabsContent value='inactive'>
            <div className='m-2 border-1 border-gray-100 rounded-md'>
              <div className='w-full flex justify-between items-center'>
                <h2 className='font-bold'>Categories</h2>
                <div className='text-xs text-muted-foreground'>
                  Showing{" "}
                  <strong>
                    {categories.filter((cat) => !cat?.active).length}
                  </strong>{" "}
                  categories
                </div>
              </div>
            </div>
            <ul className='mt-3 grid grid-cols-2 gap-4'>
              {categories
                .filter((cat) => !cat?.active)
                .map((category: ICategory, index: number) => (
                  <SingleItem
                    key={index}
                    id={category?.id}
                    image={category?.img}
                    name={category?.name}
                    active={category?.active}
                    discount={category?.discount}
                    totalProduct={category?.totalProducts}
                    handleEditBtnClick={() => {
                      setSelectedCategory(category);
                    }}
                    deleteExistingCategory={deleteExistingCategory}
                  />
                ))}
            </ul>
          </TabsContent>
        </div>
      </Tabs>
    );
  };

  const renderAddNewCategoryDialog = () => {
    return (
      <UpdateCategory
        loading={loading}
        createCategory={createCategory}
        editExistingCategory={editExistingCategory}
        isNewCategory={true}
        open={openCreateDialog}
        handleOpenChange={(open) => setOpenCreateDialog(open)}
      />
    );
  };

  const renderUpdateCategoryDialog = () => {
    return (
      <UpdateCategory
        loading={loading}
        createCategory={createCategory}
        editExistingCategory={editExistingCategory}
        isNewCategory={false}
        open={openUpdateDialog}
        category={selectedCategory}
        handleOpenChange={(open) => setOpenUpdateDialog(open)}
      />
    );
  };

  const mainView = () => {
    if (loading) {
      return <SkeletonCard title='Category is fetching' />;
    } else if (!!categories && categories.length > 0) {
      return renderCatergoryListView();
    } else {
      return renderEmptyView();
    }
  };

  return (
    <div className='w-full sm:w-full'>
      {mainView()}
      {renderAddNewCategoryDialog()}{" "}
      {!!categories && categories.length > 0 && renderUpdateCategoryDialog()}
    </div>
  );
};

export default CatergoryList;
