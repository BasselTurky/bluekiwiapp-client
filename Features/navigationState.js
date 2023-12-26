import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  index: 0,
  routes: [
    { key: "first", title: "Gallery" },
    { key: "second", title: "Favorite" },
  ],
};

const navigationState = createSlice({
  name: "navigationState",
  initialState: { value: initialStateValue },
  reducers: {
    setNavigationIndex: (state, action) => {
      state.value.index = action.payload;
    },
  },
});

export const { setNavigationIndex } = navigationState.actions;

export default navigationState.reducer;
