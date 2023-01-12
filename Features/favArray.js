import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {};

const favArray = createSlice({
  name: "favArray",
  initialState: { value: initialStateValue },
  reducers: {
    setFavArray: (state, action) => {
      state.value = action.payload;
    },
    setUserFav: (state, action) => {
      state.value[action.payload.key] = action.payload.value;
    },
    addFav: (state, action) => {
      state.value[action.payload.key].push(action.payload.value);
    },
    removeFromFav: (state, action) => {
      state.value[action.payload.key].splice(action.payload.index, 1);
    },
  },
});

export const { setFavArray, setUserFav, addFav, removeFromFav } =
  favArray.actions;

export default favArray.reducer;
