import { ToastContainer, toast } from "react-toastify";

export const showToastMessage = (toastType, msg) => {
  if (toastType === "warning") {
    toast.warning(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  if (toastType === "success") {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  if (toastType === "info") {
    toast.info(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
