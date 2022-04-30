import React, { lazy, Suspense, useEffect, useState } from "react";
import CN from "classnames";
import { Layout } from "../../../../core/layout/layout";
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { ProminentLocation } from "../../../../core/redux-store/features/api/mock-data/simplemaps-locations";
import { useAppDispatch, useAppSelector } from "../../../../core/redux-store/hooks";
import {
  FetchProminentLocationsAsync, selectDisplayCities, selectDisplayContent, selectProvinces, selectStatus, setProvinceCity
} from "../../../../core/redux-store/features/discovery/discoverySlice";
import LocationCard from "../location-card/location-card";
import Title from "../../../../core/header/location-title/title";
import SearchBar from "../../search-bar/search-bar";
const Spinner = lazy(() => import("../../../../core/spinner/spinner"));


export default function Province(props: any) {
  const location: Location = useLocation();
  const provinces: ProminentLocation[] = useAppSelector(selectProvinces);
  const status = useAppSelector(selectStatus);
  const cities: ProminentLocation[] = useAppSelector(selectDisplayCities)
  const dispatch = useAppDispatch();
  const [error, setError] = useState<boolean>(false);
  const displayContnet = useAppSelector(selectDisplayContent)
  const navigate = useNavigate();
  const [pageLocation, setPageLocation] = useState("");

  /**
   * Find out what province the user is trying access. URL information.
   * @returns string. Returns the found province that the 
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
      console.log("(checkRouterLocation):set province in store", prov);
      dispatch(setProvinceCity(prov.admin_name))
    }

    if (!prov) {
      console.log("(checkRouterLocation):prov is false");
      setError(true);
    }

    // Can possibly return undefined 
    return prov
  }

  const handleCardClick = (place: ProminentLocation) => {
    console.log("FUNCTION:handleCardClick", place)
    navigate(`/discovery/province/${place.admin_name.toLocaleLowerCase()}`);
  }

  const titleText = (): string => {
    const path: string = location.pathname
    let prov: ProminentLocation | undefined = undefined;
    // Find page name
    return `Province: ${pageLocation}`;
  }

  // Check store and update it if nothing is there
  useEffect(() => {
    if (status !== "complete") {
      dispatch(FetchProminentLocationsAsync());
    }
  }, [])

  useEffect(() => {
    console.log("COMPONENT:Province:useEffet:provinces", provinces);
    checkRouterLocation();
  }, [provinces])

  return (
    <Layout>
      <SearchBar />
      <Title text={titleText()} />

      <div className="flex flex-col">
        {
          ((cities && cities.length > 0) && !error) && cities.map((city: ProminentLocation, index: number) => {
            return (
              <Suspense key={city.admin_name + index + city.lat} fallback={<Spinner />}>
                <LocationCard location={city} handleCardClick={handleCardClick} showcase={"city"} />
              </Suspense>
            )
          })
        }

        {error && <div><p>error found</p></div>}
      </div>
    </Layout>
  )

}