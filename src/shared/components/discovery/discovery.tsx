import React from "react";
import NavigationalBar from "../../../core/header/navigation/navigational-bar";
import Title from "../../../core/header/location-title/title";
import CN from "classnames";
import SearchBar from "../search-bar/search-bar";

export default function Discovery() {

  const compContent = CN("component-content",)

  return (
    <div className="component">
      <NavigationalBar />
      <div className={compContent}>
        <SearchBar />
        <Title text="Discovery" />
        <p>discovery component is working</p>

      </div>
    </div>
  )
}
