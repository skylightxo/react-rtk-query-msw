import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const slice = createSlice({
  name: "data",
  initialState: { data: null } as {
    data: null | any[];
  },
  reducers: {
    getData: (state, { payload: { data } }: PayloadAction<{ data: any[] }>) => {
      state.data = data;
    },
  },
  extraReducers: (builder) => {},
});

export const { getData } = slice.actions;

export default slice.reducer;

export const selectData = (state: RootState) => state.data;
