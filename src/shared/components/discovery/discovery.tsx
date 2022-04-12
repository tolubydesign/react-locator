import React, { useEffect, Suspense, lazy } from "react";
import CN from "classnames";
import SCSS from "./discovery.module.scss";
import SearchBar from "../search-bar/search-bar";
import { useAppDispatch, useAppSelector } from "../../../core/redux-store/hooks";
import {
  FetchProminentLocationsAsync, selectCompleteLocation, selectDiscovery, selectProvinces, selectStatus
} from "../../../core/redux-store/features/discovery/discoverySlice";
import { Layout } from "../../../core/layout/layout";
import Title from "../../../core/header/location-title/title";
import { ProminentLocation } from "../../../core/redux-store/features/api/mock-data/simplemaps-locations";
const Spinner = lazy(() => import("../../../core/spinner/spinner"));

export default function Discovery<React>() {
  const discoveryState = useAppSelector(selectDiscovery);
  const status = useAppSelector(selectStatus);
  // const loc: ProminentLocation[] = useAppSelector(selectCompleteLocation);
  const provinces: ProminentLocation[] = useAppSelector(selectProvinces);

  const dispatch = useAppDispatch();

  // Check store and update it if nothing is there
  useEffect(() => {
    if (status !== "complete") {
      dispatch(FetchProminentLocationsAsync());
    }
  }, [])

  useEffect(() => {
    console.log("COMP Discovery useEffet", provinces)
  }, [status])

  const compContent = CN("component-content",)
  const prominentButtonClassName = CN(SCSS["prominent-location--button"], "flex justify-center items-center bg-gray-100 relative w-full h-40 overflow-hidden mb-6 rounded-md");
  const backgroundImageClassName = CN(SCSS["prominent-location--background-image"], "absolute w-full");
  const prominentTextClassName = CN("text-xl md:text-2xl font-extrabold text-white absolute bottom-4 left-4");


  return (
    <Layout>
      <div className={compContent}>
        <SearchBar />
        <Title text="Discovery" />

        <div className="flex flex-col">
          {
            provinces.map((l: ProminentLocation, index: number) => {
              return (
                <Suspense fallback={<Spinner />}>
                  <button key={`${l.lat}_${l.lng}`} data-element-map={`discovery-prominent-locations`} className={prominentButtonClassName}>
                    <img className={backgroundImageClassName} src={l.bg_image}
                      alt={`Background image of ${l.admin_name}.`} />
                    <p className={prominentTextClassName} style={{ zIndex: 1 }}>{l.admin_name}</p>
                  </button>
                </Suspense>
              )
            })
          }
        </div>

      </div>
    </Layout>

  )
}

function rootReducer(rootReducer: any) {
  throw new Error("Function not implemented.");
}

