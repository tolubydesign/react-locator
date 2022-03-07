import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Navigation() {

  const naviClassName = "flex flex-col fixed top-10 left-10 z-10  bg-slate-300 rounded-md "
  const naviButtonClassName = "px-3 py-1 text-black rounded-md m-2 bg-white font-bold text-center"

  return (
    <div>
      <nav className={naviClassName}>
        <Link className={naviButtonClassName} to="/discovery">Discovery</Link>
        <Link className={naviButtonClassName} to="/map">Map</Link>
        <Link className={naviButtonClassName} to="/">Index</Link>
      </nav>
      <Outlet />
    </div>
  )
}