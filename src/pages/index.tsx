import PageView from "./pageView";
import SignIn from "./auth";
import { Outlet } from "react-router-dom";

interface Props {
  isAuth: boolean;
}
const Page: React.FC<Props> = ({ isAuth }) => {
  if (!isAuth) {
    return <SignIn />;
  } else
    return (
      <>
        <PageView />
        <Outlet />
      </>
    );
};

export default Page;
