import { createSlice } from "@reduxjs/toolkit";
import uuid from "uuid/v4";

const toDoSlice = createSlice({
  initialState: [],
  name: "todos",
  reducers: {
    toDoAdd(state, action) {
      state.push({
        id: uuid(),
        title: action.payload,
        done: false
      });
    },
    toDoToggle(state, action) {
      const t = state.find(item => item.id === action.payload);
      t.done = !t.done;
    }
  }
});

export const { toDoAdd, toDoToggle } = toDoSlice.actions;
export default toDoSlice.reducer;
