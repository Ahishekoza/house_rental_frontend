/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: JSON.parse(localStorage.getItem('query'))||{},
  query_data: [],
};

const querySlice = createSlice({
  name: "query",
  initialState: initialState,
  reducers: {
    setQuery(state, action) {
      state.query = {...state.query,...action.payload};
      localStorage.setItem("query", JSON.stringify(state.query));
    },
  },
});

export const { setQuery } = querySlice.actions;
export default querySlice.reducer;
