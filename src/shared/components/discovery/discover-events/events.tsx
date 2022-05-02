import React, { lazy, Suspense, useEffect, useState } from "react";
import CN from "classnames";
import { Layout } from "../../../../core/layout/layout";
import { Location, useLocation } from 'react-router-dom';
import { ProminentLocation } from "../../../../core/redux-store/features/api/mock-data/simplemaps-locations";
import { useAppDispatch, useAppSelector } from "../../../../core/redux-store/hooks";
import {
  FetchProminentLocationsAsync, selectDisplayCities, selectDisplayContent, selectProvinces, selectStatus, setProvinceCity
} from "../../../../core/redux-store/features/discovery/discoverySlice";
import LocationCard from "../location-card/location-card";
import Title from "../../../../core/header/location-title/title";
import SearchBar from "../../search-bar/search-bar";
const Spinner = lazy(() => import("../../../../core/spinner/spinner"));

export default function Events() {
  // React Router
  const location: Location = useLocation();

  const titleText = (): string => {
    const path: string = location.pathname
    let prov: ProminentLocation | undefined = undefined;
    console.log("FUNCTION:titleText", location);

    // Find page name
    const pageLocation = path.replace("/discovery/province/", "");
    return `Event: ${pageLocation}`;
  }

  return (
    <Layout>
      <SearchBar />
      <Title text={titleText()} />

      <div className="flex flex-col">
        <p>event</p>
      </div>
    </Layout>
  )
}