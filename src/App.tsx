import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { decodeTokenFunction } from "./utils/helperFunction";
import useLoginAuth from "./pages/auth/hooks/useLoginAuth";
import { decodeToken } from "react-jwt";
import Page from "./pages";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  const { user, token, refreshToken, fetchUserById } = useLoginAuth();
  const [authToken, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [isFetchingToken, setIsFetchingToken] = useState<boolean>(false);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  const refreshUser = async () => {
    const response = await refreshToken();
    if (!response?.success) setAuthSuccess(false);
    else {
      setAuthSuccess(true);
      localStorage.setItem("token", response?.token);
      localStorage.setItem("refreshToken", response?.refreshToken);
    }
  };

  useEffect(() => {
    // Check if token exists and is still valid
    if (!!authToken) {
      setIsFetchingToken(true);
      if (decodeTokenFunction(authToken)) {
        // Token is expired, initiate a refresh
        refreshUser();
      } else {
        if (!user) {
          const { id } = decodeToken(authToken) as { id: number };
          fetchUserById(id);
        }
        setAuthSuccess(true);
      }
      setIsFetchingToken(false);
    }
    //eslint-disable-next-line
  }, [authToken]);

  useEffect(() => {
    if (!!token) setToken(token);
  }, [token]);

  const renderLoadingIcon = () => {
    return (
      <div className='w-full h-[100vh] flex justify-center items-center animate-bounce'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          id='Layer_1'
          data-name='Layer 1'
          viewBox='0 0 24 24'
          width='64'
          fill='red'
          height='64'>
          <path d='m19,0H5C2.243,0,0,2.243,0,5v14c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-1.199,15.451c-.955,2.198-3.345,3.603-5.798,3.603-.586,0-1.176-.08-1.751-.249-2.503-.734-4.251-3.123-4.251-5.808v-1.857c0-1.66.691-3.281,1.896-4.447,1.18-1.142,2.727-1.732,4.317-1.689,1.938.063,3.741,1.056,4.824,2.655.31.458.19,1.079-.267,1.389-.458.31-1.08.19-1.389-.267-.725-1.071-1.934-1.735-3.233-1.778-1.052-.037-2.074.365-2.861,1.127-.817.792-1.287,1.889-1.287,3.01v1.857c0,1.804,1.158,3.403,2.815,3.889,2.011.591,4.37-.432,5.151-2.231.071-.164.015-.307-.045-.398-.105-.16-.279-.255-.465-.255h-3.457c-.552,0-1-.448-1-1s.448-1,1-1h3.457c.863,0,1.662.433,2.137,1.158.453.691.531,1.548.207,2.292Z' />
        </svg>
      </div>
    );
  };

  return (
    <div className='App'>
      {!!isFetchingToken && renderLoadingIcon()}
      {!isFetchingToken && (
        <TooltipProvider>
          <Page isAuth={authSuccess} />
        </TooltipProvider>
      )}
      <Toaster />
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </div>
  );
};

export default App;
