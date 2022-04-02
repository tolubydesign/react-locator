interface City {
  name: string;
  backgroundImage: string;
}

interface CityLocations {
  location: string;
  locationBackgroundImage: string;
  cities?: City[];
}

export const CityLocations: CityLocations[] = [
  {
    location: "Gauteng",
    locationBackgroundImage: "",
    cities: [
      {
        name: "Pretoria",
        backgroundImage: ""
      },
      {
        name: "Johannesburg",
        backgroundImage: ""
      },

    ]
  },
  {
    location: "Eastern Cape",
    locationBackgroundImage: "",
  },
  {
    location: "Free State",
    locationBackgroundImage: "",
  },
  {
    location: "Western Cape",
    locationBackgroundImage: "",
  },
]


