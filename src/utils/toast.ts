import { Bounce, toast, ToastPosition } from "react-toastify";

const toastConfig = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

//@ts-ignore
export const successToast = (
  message: string,
  position: ToastPosition | undefined = "top-right"
) => toast.success(message, { ...toastConfig, position });

//@ts-ignore
export const infoToast = (
  message: string,
  position: ToastPosition | undefined = "top-right"
) => toast.info(message, { ...toastConfig, position });

//@ts-ignore
export const warnToast = (
  message: string,
  position: ToastPosition | undefined = "top-right"
) => toast.warn(message, { ...toastConfig, position });

//@ts-ignore
export const errorToast = (
  message: string,
  position: ToastPosition | undefined = "top-right"
) => toast.error(message, { ...toastConfig, position });
