import React, { useEffect, useState } from "react";
import CN from "classnames";
import SCSS from "./map.module.scss";
// Leaflet Imports;
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios, { AxiosResponse } from "axios";
import MarkerIconPNG from "./marker-icon.png";


// testing decorators and such 
// Referencing: https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841
function readonly(target: any, key: any, decorator: any) {
  decorator.writable = false;
  return decorator
}

function flip(target: any, key: any, decorator: any) {
  // console.log("FUNCTION flip >", target, key, decorator);
  return decorator;
}

class Cat {
  @flip
  meow(): string {
    return `${this.meow} says Meow.`;
  }
}

const garfield: any = new Cat();
garfield.meow = function () {
  console.log("Function change");
}

interface GeoIPLocation {
  city: string;
  country_code: string;
  country_name: string;
  ip: string;
  latitude: number;
  longitude: number;
  metro_code: number;
  region_code: string;
  region_name: string;
  time_zone: string;
  zip_code: string;
}

export default function Map() {
  // map hold the variable but _map is the source of truth.
  // When the component is reloaded map will refer to _map.
  // map and _map work off each other.
  let map: any = null;
  const [_map, MapState] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<GeoIPLocation | null>(null);
  const [mapAttribute, setMapAttribute] = useState<string>('Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>')
  const [mapStyle, setMapStyle] = useState<string>(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`);
  const [mapLayerID, setMapLayerID] = useState<string>('mapbox/streets-v11');
  const [mapError, setMapError] = useState<string | null>(null);

  // Reference: https://docs.mapbox.com/api/maps/styles/#mapbox-styles
  const mapLayerIDs = {
    "streets": 'mapbox/streets-v11', // mapbox://styles/mapbox/streets-v11
    "satellite": "mapbox/satellite-v9", // mapbox://styles/mapbox/satellite-v9
    "street-satellite": "mapbox/satellite-streets-v11", // mapbox://styles/mapbox/satellite-streets-v11
    "light": "mapbox/light-v10", // mapbox://styles/mapbox/light-v10
    "dark": "mapbox/dark-v10", // mapbox://styles/mapbox/dark-v10
    "outdoors": "mapbox/outdoors-v11", // mapbox://styles/mapbox/outdoors-v11
    "navigation-day": "mapbox/navigation-day-v1", // mapbox://styles/mapbox/navigation-day-v1
    "navigation-night": "mapbox/navigation-night-v1", // mapbox://styles/mapbox/navigation-night-v1
  }

  const leafletMapCompClasName = CN(SCSS["leaflet-map-comp"]);


  // Find the user's approxomate location.
  const loacateUser = () => {
    axios.get("https://freegeoip.app/json/", {
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
      }
    }).then((resp: AxiosResponse) => {
      console.log("Geo IP", resp);
      setUserLocation(resp.data)
      return resp.data;
    }).catch((error: Error) => {
      console.log("Error: Geo IP", error.message);
    })
  }

  // initialize the map on the "map" div with a given center and zoom
  const initializeMap = () => {
    try {
      map = L.map('leaflet-map', {
        center: [51.505, -0.09],
        zoom: 13
      });

      if (map && !userLocation) {
        loacateUser()
      }

      L.tileLayer(mapStyle, {
        attribution: mapAttribute,
        maxZoom: 18,
        id: mapLayerID,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      }).addTo(map);
      map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.
      console.log("FUNCTION initializeMap", map, _map);

      
      // var maker = L.marker([25.045403, 121.526088], { icon: markerIcon }).addTo(map);


      /** Reference: https://harrywood.co.uk/maps/examples/leaflet/geolocate.view.html */
      // map view before we get the location
      map.setView(new L.LatLng(51.505, -0.09), 13);
      // Set the map to show the user's location
      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);
      map.locate({ setView: true, maxZoom: 16 });

      L.marker([50.5, 30.5]).addTo(map);

      // assign to _map;
      MapState(map);
    } catch (_e: any) {
      const error: Error = _e;
      console.warn("Error: Initialising Leaflet Map", error.message);
      console.warn("Error: Initialising Leaflet Map", error);
      setMapError(error.message);
    }

  }

  const setUserGeolocation = () => {
    navigator.geolocation.getCurrentPosition((location) => {
      var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

      // var mymap = L.map('mapid').setView(latlng, 13)
      // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      //   attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
      //   maxZoom: 18,
      //   id: 'mapbox.streets',
      //   accessToken: 'pk.eyJ1IjoiYmJyb29rMTU0IiwiYSI6ImNpcXN3dnJrdDAwMGNmd250bjhvZXpnbWsifQ.Nf9Zkfchos577IanoKMoYQ'
      // }).addTo(mymap);

      // var marker = L.marker(latlng).addTo(mymap);
    });
  }

  const onLocationFound = (loc: any) => {
    var radius = loc.accuracy;
    var location = loc.latlng

    // Customise marker icon
    const markerIcon = L.icon({
      iconUrl: MarkerIconPNG,
      iconSize: [25, 41],
      popupAnchor: [0, -10],
      // shadowUrl: require('../static/marker.png'),
      // iconAnchor: [18, 18],
      // shadowSize: [0, 0],
      // shadowAnchor: [10, 10]
    });

    // set marker icon 
    L.marker(location, { icon: markerIcon }).addTo(map)
    L.circle(location, radius).addTo(map);
  }

  const onLocationError = (error: Error) => {
    console.warn("ERROR: getting user location:", error.message);
    setMapError(error.message);

    // TODO: If the map Error, set to closest point to user.
  }

  useEffect(() => {
    console.log("Location:", userLocation)
  }, [userLocation])

  useEffect(() => {
    if (!_map) {
      initializeMap();
      // setUserGeolocation()
    }

    // TODO: Comment. Explain behaviour/reasons.
    if (map && !_map) {
      // assign to _map; `_map = map`
      MapState(map);
    }

    // Map has already been iniitalised. Reassign map to _map, source of truth.
    if (_map && !map) {
      map = _map
    }

    // Reset Map Error component state
    setMapError(null);
  }, [])

  return (
    <div className="component">

      <div id="leaflet-map" className={leafletMapCompClasName} >

      </div>
      {/* set response error. if there are issues with the map or setup of map */}
      <div className="flex justify-center items-center">
        {
          mapError ?
            <span className="grid font-semibold text-xs leading-tight uppercase rounded-full bg-gray-200 w-full md:w-auto px-6 py-2 my-2">
              {mapError}
            </span>
            :
            null
        }
      </div>


    </div>
  )
}

