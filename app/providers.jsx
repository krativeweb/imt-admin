"use client";

import Aos from "aos";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ScrollToTop from "../components/common/ScrollTop";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}


  return (
    <Provider store={store}>
      <div className="shadow-lg">
        <div className="page-wrapper">
          {children}

          <ToastContainer
            position="bottom-right"
            autoClose={500}
            hideProgressBar={false}
            closeOnClick
            draggable
            pauseOnHover
            theme="colored"
          />

          <ScrollToTop />
        </div>
      </div>
    </Provider>
  );
}
