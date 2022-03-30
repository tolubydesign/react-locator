import React, { useState } from "react";
import CN from "classnames";
import { Outlet, Link } from "react-router-dom";
import SCSS from "./navi.module.scss";

export default function Navi() {

  const [nav, setNav] = useState<boolean>(false);

  const naviComponentClassName = CN(SCSS["navi--aside"])
  const naviClassName = CN(SCSS["navi--navigation"], "flex flex-col bg-slate-300 rounded-md");
  const naviButtonClassName = CN("px-3 py-1 text-black rounded-md mx-3 my-2 bg-white font-bold text-center");
  const naviIndicatorClassName = CN(SCSS["navi--inidcator"], "bg-slate-300");
  const naviIndicatorTextClassName = CN("text-center text-base font-black text-white m-0 px-2 py-1")

  return (
    <aside className={naviComponentClassName.concat(` ${nav ? SCSS["active"] : ""}`)}>
      <nav className={naviClassName}>
        {
          nav && (
            <>
              <Link className={naviButtonClassName} to="/discovery">Discovery</Link>
              <Link className={naviButtonClassName} to="/map">Map</Link>
              <Link className={naviButtonClassName} to="/">Index</Link>
            </>
          )
        }

        {
          (!nav) && <button className={naviIndicatorClassName} onClick={() => setNav(true)}>
            <p className={naviIndicatorTextClassName}>X</p>
          </button>
        }
        {
          (nav) && <button className={naviIndicatorClassName.concat(` ${SCSS["active"]}`)} onClick={() => setNav(false)}>
            <p className={naviIndicatorTextClassName}>O</p>
          </button>
        }
      </nav>


      <Outlet />
    </aside>
  )
}