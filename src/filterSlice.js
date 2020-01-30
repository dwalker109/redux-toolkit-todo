import { createSlice } from "@reduxjs/toolkit";

export const filters = {
  ALL: "ALL",
  DONE: "DONE",
  REMAINING: "REMAINING"
};

const filterSlice = createSlice({
  initialState: filters.ALL,
  name: "filter",
  reducers: {
    filterSet(state, action) {
      return action.payload;
    }
  }
});

export const { filterSet } = filterSlice.actions;
export default filterSlice.reducer;
