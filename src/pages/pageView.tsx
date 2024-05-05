import { Route, Routes } from "react-router-dom";
import Navbar from "../coreComponents/navbar";
import ProductPage from "./product";
import Category from "./product/category";
import CreateNewProduct from "./product/newProduct";
import UpdateProduct from "./product/newProduct/editProductIndex";
import CreateOrder from "./order/CreateOrder";
import OrderPage from "./order";

const PageView = () => {
  return (
    <div className='grid h-screen w-full pl-[53px]'>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<Dashboard />} /> */}
        <Route path='/products' element={<ProductPage />} />
        <Route path='/product/update/:id' element={<UpdateProduct />} />
        <Route path='/product/create' element={<CreateNewProduct />} />
        <Route path='/category' element={<Category />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/order/create' element={<CreateOrder />} />
      </Routes>
      {/* <CreateNewProduct /> */}
      {/* <Category /> */}
    </div>
  );
};

export default PageView;
