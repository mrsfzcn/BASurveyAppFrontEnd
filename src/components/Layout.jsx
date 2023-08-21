import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen max-h-full">
      <Sidebar />
      <div
        className="flex flex-col flex-[8_8_0%] max-h-screen laptop:flex-[13_13_0%] desktop:flex-[18_18_0%] xldesktop:flex-[28_28_0%] mobile:w-full
      "
      >
        <Header />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
