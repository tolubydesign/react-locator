import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import { fetchProminentLocations } from '../api/locations-api';
import { ProminentLocations } from '../api/mock-data/simplemaps-locations';

export interface DiscoveryState {
  completeLocations: ProminentLocations[];
  locations: any;
  search: string;
  userPosition: any;
  provinces: any[];
  status: 'idle' | 'complete' | 'loading' | 'failed';
}

const initialState: DiscoveryState = {
  completeLocations: [],
  provinces: [],
  locations: [],
  search: "",
  userPosition: "",
  status: 'idle',
};


export const FetchProminentLocationsAsync = createAsyncThunk("discovery/FetchLocationsAsync", async () => {
  const response: string = await fetchProminentLocations();
  console.log("FetchProminentLocationsAsync", JSON.parse(response));
  return JSON.parse(response);
})

export const discoverySlice = createSlice({
  name: 'discovery',
  initialState,
  reducers: {
    setProvinces: (state: DiscoveryState, action: PayloadAction<any[]>) => {
      state.provinces = action.payload;
    },
    setUserPosition: (state: DiscoveryState, action: PayloadAction<any[]>) => {
      state.userPosition = action.payload;
    },
    setSearch: (state: DiscoveryState, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(FetchProminentLocationsAsync.pending, (state: DiscoveryState) => {
        state.status = 'loading';
      })
      .addCase(FetchProminentLocationsAsync.fulfilled, (state: DiscoveryState, action: PayloadAction<any>) => {
        state.status = 'complete';
        state.completeLocations = action.payload;
      })
      .addCase(FetchProminentLocationsAsync.rejected, (state: DiscoveryState) => {
        state.status = 'failed';
      })
  },
});

export const { setProvinces, setUserPosition, setSearch } = discoverySlice.actions;

export const selectDiscovery = (state: RootState) => (state.discovery) ? state.discovery : initialState;
export const selectCompleteLocation = (state: RootState) => (state.discovery.completeLocations) ? state.discovery.completeLocations : initialState.completeLocations;
export const selectProvinces = (state: RootState) => (state.discovery.provinces) ? state.discovery.provinces : initialState.provinces;
export const selectLocations = (state: RootState) => (state.discovery.locations) ? state.discovery.locations : initialState.locations;
export const selectStatus = (state: RootState) => state.discovery.status;

export default discoverySlice.reducer;
