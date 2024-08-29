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
    setQuery_data(state, action) {
      console.log([...action.payload]);
      state.query_data = [...action.payload];
    },
    clearQuery(state){
      state.query = {},
      localStorage.removeItem("query")
    }
  },
});

export const { setQuery,setQuery_data,clearQuery } = querySlice.actions;
export default querySlice.reducer;
