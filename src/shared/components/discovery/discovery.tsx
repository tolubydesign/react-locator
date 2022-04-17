import React, { useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
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
import LocationCard from "./location-card/location-card";
const Spinner = lazy(() => import("../../../core/spinner/spinner"));

export default function Discovery<React>() {
  const discoveryState = useAppSelector(selectDiscovery);
  const status = useAppSelector(selectStatus);
  const provinces: ProminentLocation[] = useAppSelector(selectProvinces);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCardClick = (place: ProminentLocation) => {
    navigate(`/discovery/province/${place.admin_name}`);
  };

  // Check store and update it if nothing is there
  useEffect(() => {
    if (status !== "complete") {
      dispatch(FetchProminentLocationsAsync());
    }
  }, [])

  useEffect(() => {
    console.log("COMP Discovery useEffet", provinces)
  }, [status])

  return (
    <Layout>
      <SearchBar />
      <Title text="Discovery" />

      <div className="flex flex-col">
        {
          provinces.map((l: ProminentLocation, index: number) => {
            return (
              <Suspense key={l.admin_name + index + l.lat} fallback={<Spinner />}>
                <LocationCard location={l} handleCardClick={handleCardClick} showcase={"province"} />
              </Suspense>
            )
          })
        }
      </div>
    </Layout>

  )
}

function rootReducer(rootReducer: any) {
  throw new Error("Function not implemented.");
}

