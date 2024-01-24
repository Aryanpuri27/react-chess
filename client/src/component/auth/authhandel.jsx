import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";

export default function Authhandel() {
  return (
    <div className="flex flex-row bg-con">
      <Outlet />
      {/* <img
        src="../newchesslogo.jpg"
        alt="logo"
        className="flex w-1/2 h-screen authlogo"
      /> */}
    </div>
  );
}
