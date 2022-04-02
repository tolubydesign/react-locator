import React, { useEffect } from "react";
import NavigationalBar from "../../../core/header/navigation/navigational-bar";
import Title from "../../../core/header/location-title/title";
import CN from "classnames";
import SearchBar from "../search-bar/search-bar";
import { useAppDispatch, useAppSelector } from "../../../core/redux-store/hooks";
import {
  FetchProminentLocationsAsync, selectCompleteLocation, selectDiscovery, selectStatus
} from "../../../core/redux-store/features/discovery/discoverySlice";
import { Layout } from "../../../core/layout/layout";

export default function Discovery<React>() {
  const discoveryState = useAppSelector(selectDiscovery);
  const status = useAppSelector(selectStatus);
  const loc = useAppSelector(selectCompleteLocation);
  const dispatch = useAppDispatch();

  // Check store and update it if nothing is there
  useEffect(() => {
    if (status !== "complete") {
      dispatch(FetchProminentLocationsAsync());
    }

    console.log("COMP Discovery useEffet", loc)
  }, [])

  useEffect(() => {
    console.log("COMP Discovery useEffet", loc)
  }, [status])

  const compContent = CN("component-content",)

  return (
    <Layout >
      <div className={compContent}>
        <SearchBar />
        <Title text="Discovery" />
        <p>discovery component is working</p>
      </div>
    </Layout>

  )
}

function rootReducer(rootReducer: any) {
  throw new Error("Function not implemented.");
}

