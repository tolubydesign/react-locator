import React, { useEffect, useState } from "react";
import CN from "classnames";
import { Layout } from "../../../../core/layout/layout";
import { Link, Location, useLocation, useNavigate } from 'react-router-dom';
import { ProminentLocation } from "../../../../core/redux-store/features/api/mock-data/simplemaps-locations";
import { useAppDispatch, useAppSelector } from "../../../../core/redux-store/hooks";
import {
  FetchProminentLocationsAsync, selectDisplayCities, selectDisplayContent, selectProvinces, selectStatus, setProvinceCity
} from "../../../../core/redux-store/features/discovery/discoverySlice";
import LocationCards from "../location-cards/location-cards";
import Title from "../../../../core/header/location-title/title";
import SearchBar from "../../search-bar/search-bar";

export function ProvinceRedirect() {
  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
        <p className="p-4 ">You've landed on an unknown page. <Link to="/discovery" className="text-orange font-semibold ">Click here to be redirected to the main page.</Link></p>
      </div>
    </Layout>
  )
}

export default function Province(props: any) {
  const location: Location = useLocation();
  const provinces: ProminentLocation[] = useAppSelector(selectProvinces);
  const status = useAppSelector(selectStatus);
  const cities: ProminentLocation[] | null = useAppSelector(selectDisplayCities)
  const dispatch = useAppDispatch();
  const [error, setError] = useState<boolean>(false);
  const displayContnet = useAppSelector(selectDisplayContent)
  const navigate = useNavigate();
  const [pageLocation, setPageLocation] = useState("");

  /**
   * Find out what province the user is trying access. URL information.
   * @returns object. Returns the found province that the 
   */
  const checkRouterLocation = (): ProminentLocation | undefined => {
    // Reset error state
    setError(false);

    const path: string = location.pathname
    let prov: ProminentLocation | undefined = undefined;

    // Find page name
    setPageLocation(path.replace("/discovery/province/", ""));
    // Loop through all Provinces, fetched from API,
    prov = provinces.find((province: ProminentLocation) => {
      if (province.admin_name.toLocaleLowerCase() === pageLocation.toLocaleLowerCase()) {
        return province
      }
    });

    if (prov) {
      // console.log("(checkRouterLocation):set province in store", prov);
      dispatch(setProvinceCity(prov.admin_name))
    }

    if (!prov) {
      // console.log("(checkRouterLocation):prov is false");
      setError(true);
    }

    // Can possibly return undefined 
    return prov
  }

  const handleCardClick = (place: ProminentLocation) => {
    console.log("FUNCTION:handleCardClick", place)
    navigate(`/discovery/province/${pageLocation.toLocaleLowerCase()}/city/${place.city.toLocaleLowerCase()}`);
  }

  const titleText = (): string => {
    const path: string = location.pathname
    let prov: ProminentLocation | undefined = undefined;
    // Find page name
    return `Province: ${pageLocation}`;
  }

  // Check store and update it if nothing is there
  useEffect(() => { }, [])

  useEffect(() => {
    if (!cities || status !== "complete") {
      console.log("COMPONENT:Province:useEffet:provinces", provinces);
      dispatch(FetchProminentLocationsAsync());
      checkRouterLocation();
    }
  }, [status, provinces])

  return (
    <Layout>
      <Title text={titleText()} />
      <SearchBar />

      {cities && cities.length > 0 && <LocationCards locations={cities} handleCardClick={handleCardClick} showcase={"city"} />}
      {error && <div><p>error found</p></div>}
    </Layout>
  )

}