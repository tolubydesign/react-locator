import { ProminentLocation } from "../api/mock-data/simplemaps-locations";

export function GetProvinces(fullLocationList: ProminentLocation[]): ProminentLocation[] {
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  // Resource: https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array

  let seen: any = [];
  let out: ProminentLocation[] = [];
  const len = fullLocationList.length;
  let j = 0;

  for (var i = 0; i < len; i++) {
    const location: ProminentLocation = fullLocationList[i]
    // admin_name === province
    let item: any = fullLocationList[i].admin_name;
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = location;
    }
  }

  return out;
}