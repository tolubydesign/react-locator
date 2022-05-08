import { resolve } from "dns";
import { LocationEvents } from "./mock-data/events";
import { CityLocations } from "./mock-data/locations";
import { prominentLocations } from "./mock-data/simplemaps-locations";

export class LocationStore {
  storeState: any;

  constructor(store: any) {
    this.storeState = store;
  }

  checkStore () {
    if (!this.storeState) {
      this.fetchData();
    }
    return null
  }

  async fetchData () {
    const LocalResponse = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(CityLocations);
      }, 300);
    });

    return LocalResponse;
  }

  async Provinces () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(CityLocations);
      }, 300);
    });
  }

}

export async function fetchProminentLocations(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(prominentLocations));
    }, 300);
  });
}


export async function fetchEvents(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.stringify(LocationEvents))
    }, 500)
  })
}
