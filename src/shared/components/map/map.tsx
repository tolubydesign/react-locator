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
  const mapLayerIDs = [
    { name: "streets", id: 'mapbox/streets-v11' }, // mapbox://styles/mapbox/streets-v11
    { name: "satellite", id: "mapbox/satellite-v9" },// mapbox://styles/mapbox/satellite-v9
    { name: "street-satellite", id: "mapbox/satellite-streets-v11" }, // mapbox://styles/mapbox/satellite-streets-v11
    { name: "light", id: "mapbox/light-v10" }, // mapbox://styles/mapbox/light-v10
    { name: "dark", id: "mapbox/dark-v10" }, // mapbox://styles/mapbox/dark-v10
    { name: "outdoors", id: "mapbox/outdoors-v11" }, // mapbox://styles/mapbox/outdoors-v11
    { name: "navigation-day", id: "mapbox/navigation-day-v1" }, // mapbox://styles/mapbox/navigation-day-v1
    { name: "navigation-night", id: "mapbox/navigation-night-v1" }, // mapbox://styles/mapbox/navigation-night-v1
  ]

  const leafletMapCompClassName = CN(SCSS["leaflet-map-comp"], "relative");

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

  const generateMapLayers = () => {
    return mapLayerIDs.map((layer, index: number) => {
      return {
        name: layer.name,
        map: L.tileLayer(mapStyle, {
          attribution: mapAttribute,
          maxZoom: 18,
          id: layer.id,
          tileSize: 512,
          zoomOffset: -1,
          accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
        })
      }
    })
  }

  // initialize the map on the "map" div with a given center and zoom
  const initializeMap = () => {
    try {
      // map = L.map('leaflet-map', {
      //   center: [51.505, -0.09],
      //   zoom: 13
      // });
      map = L.map('leaflet-map');

      if (map && !userLocation) {
        loacateUser()
      }

      const baseMaps: any = {}
      const generatedMaps = generateMapLayers();
      const defaultLayer = L.tileLayer(mapStyle, {
        attribution: mapAttribute,
        maxZoom: 18,
        id: mapLayerID,
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
      });

      for (const [key, value] of Object.entries(generatedMaps)) {
        if (Object.prototype.hasOwnProperty.call(generatedMaps, key)) {
          // const io = generatedMaps[key].name;
          const v = value.name
          baseMaps[v] = value.map;

        }
      }

      map.addLayer(defaultLayer);

      // Initialise overlay layers
      var hiking = L.tileLayer('//tile.lonvia.de/hiking/{z}/{x}/{y}.png', {
        maxZoom: 18
      })

      var cycling = L.tileLayer('//tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
        maxZoom: 18
      })

      var overlayMaps = {
        'Lonvia hiking routes': hiking,
        'Lonvia cycling routes': cycling
      };

      // Add the layer picker control
      var layerControl = L.control.layers(baseMaps).addTo(map);
      map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text. Attribution overload

      var loc = new L.LatLng(51.505, -0.09);
      map.setView(loc, 13);
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


  // TODO: experiemental work
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
    if (!_map && !map) {
      initializeMap();
      // setUserGeolocation()
    } else if (map && !_map) {
      // TODO: Comment. Explain behaviour/reasons.
      // assign to _map; `_map = map`
      MapState(map);
    } else if (!map && _map) {
      // Map has already been iniitalised. Reassign map to _map, source of truth.
      map = _map
    }

    // Reset Map Error component state
    setMapError(null);

    console.log("COMPONENT MAP:", map, _map);
  }, [])

  return (
    <div className="component">

      <div className="relative mx-w">
        <div id="leaflet-map" className={leafletMapCompClassName}></div>
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

