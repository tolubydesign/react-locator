import React from "react";
import CN from "classnames";
import { Outlet, Link } from "react-router-dom";
import SCSS from "./navi.module.scss";

export default function Navi() {

  const naviClassName = CN("flex flex-col fixed top-4 left-4 md:top-10 md:left-10 z-10  bg-slate-300 rounded-md");
  const naviButtonClassName = CN("px-3 py-1 text-black rounded-md m-2 bg-white font-bold text-center");

  return (
    <aside>
      <nav className={naviClassName}>
        <Link className={naviButtonClassName} to="/discovery">Discovery</Link>
        <Link className={naviButtonClassName} to="/map">Map</Link>
        <Link className={naviButtonClassName} to="/">Index</Link>
      </nav>
      <Outlet />
    </aside>
  )
}