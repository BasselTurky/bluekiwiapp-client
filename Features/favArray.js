import { createSlice } from "@reduxjs/toolkit";
// import { enableMapSet } from "immer";
// enableMapSet();
const initialStateValue = {};

const favArray = createSlice({
  name: "favArray",
  initialState: { value: initialStateValue },
  reducers: {
    setFavArray: (state, action) => {
      state.value = action.payload;
    },
    createUserFav: (state, action) => {
      // state.value[action.payload.key] = action.payload.value;
      // state.value.set(action.payload.key, new Map());

      // if(!state.value[action.payload]){
      state.value[action.payload] = {};
      // }
    },
    addFav: (state, action) => {
      // state.value[action.payload.key].push(action.payload.value);

      // get key & object, then insert new record in favmap = key:imgObj

      // req: user. key, imgObj

      // state.value
      //   .get(action.payload.user)
      //   .set(action.payload.key, action.payload.imgObj);

      state.value[action.payload.user][action.payload.key] =
        action.payload.imgObj;
      // state.value.set(action.payload.key,action.payload.imgObj)
    },
    removeFromFav: (state, action) => {
      // state.value[action.payload.key].splice(action.payload.index, 1);
      // req: user, key

      // state.value.get(action.payload.user).delete(action.payload.key);

      delete state.value[action.payload.user][action.payload.key];
    },
  },
});

export const { setFavArray, createUserFav, addFav, removeFromFav } =
  favArray.actions;

export default favArray.reducer;
