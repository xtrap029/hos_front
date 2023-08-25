import { memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (props) => {
  toast.success(props.children, { toastId: "toastSuccess" });

  return (
    <ToastContainer
      className="rounded-lg"
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      rtl={false}
      draggable
      theme="light"
    />
  );
};

export default memo(Toast);
