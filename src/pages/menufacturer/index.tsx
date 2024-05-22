import { Outlet, Route, Routes } from "react-router-dom";
import ManufacturerListView from "./manufacturerListView";
import UpdateManufacturer from "./updateManufacturer";
import AddManufecturer from "./addManufacturer";
import MainView from "../../coreComponents/mainView";

const ManufacturerView = () => {
  const mainView = () => {
    return (
      <>
        <Routes>
          <Route path='/add' element={<AddManufecturer />} />
          <Route path='/edit/:manuId' element={<UpdateManufacturer />} />
          <Route path='/' element={<ManufacturerListView />} />
        </Routes>
        <Outlet />
      </>
    );
  };

  return (
    <MainView title='Manufacturer'>
      <div className='w-[93vw] sm:w-full'>{mainView()}</div>
    </MainView>
  );
};

export default ManufacturerView;
