import React, { useState } from "react";
import CN from "classnames";
import SCSS from "./search-bar.module.scss";

export default function SearchBar() {

  const [search, setSearch] = useState<string>("");
  const section = CN(SCSS["search--component"])
  const searchGroupClassName = CN(SCSS["search--input--group"], "w-full flex flex-row justify-center items-center")
  const searchInputClassName = CN(SCSS["search--input"], "bg-gray-100 w-full rounded-md px-4 py-1 md:px-6 md:py-2");
  const filterImageClassName = CN(SCSS["filter--image"]);
  const filterButtonClassName = CN(SCSS["filter--button"], "pl-4")

  const handleFilterButtonClick = () => {

  }

  return (
    <aside data-component="Search Bar Comp" className={section}>
      <div className={searchGroupClassName}>

        <input className={searchInputClassName} value={search}
          onChange={(e) => setSearch(e.target.value)} placeholder="Search for Location." />

        <button className={filterButtonClassName} onClick={() => handleFilterButtonClick()}>
          <img className={filterImageClassName} src={process.env.PUBLIC_URL + "/assets/svg/filter-icon.svg"}
            alt="Filter image. Click button to open Filtered search options"
            width={"32"} height={"32"} />
        </button>
      </div>
    </aside>
  )
}