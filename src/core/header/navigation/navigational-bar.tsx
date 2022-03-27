import React from "react";
import CN from "classnames";
import SCSS from "./navigational-bar.module.scss";

export default function NavigationalBar() {
  const section = CN("w-full flex justify-between flex-row px-6 md:px-10 py-3 md:py-6");
  const navButtonImageClassName = CN(SCSS["navigation--button--icon-image"]);
  const navButtonClassName = CN(SCSS[""])

  const handleBackButtonClick = () => {
    console.log("(handleBackButtonClick)")
  }

  const handleUserButtonClick = () => {
    console.log("(handleUserButtonClick)")
  }

  return (
    <nav data-component="Navigational Bar Comp" className={section}>
      <button className={navButtonClassName} onClick={() => handleBackButtonClick()}>
        <img className={navButtonImageClassName} src={process.env.PUBLIC_URL + '/assets/svg/back-icon.svg'} 
          width={"26"} height={"26"}/>
      </button>

      <button className={navButtonClassName} onClick={() => handleUserButtonClick()}>
        <img className="" src={process.env.PUBLIC_URL + '/assets/svg/user-icon.svg'}
          width={"26"} height={"26"}/>
      </button>
    </nav>
  )
}
