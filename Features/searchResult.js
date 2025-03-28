import { createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
enableMapSet();
const initialStateValue = null;

const searchResult = createSlice({
  name: "searchResult",
  initialState: { value: initialStateValue },
  reducers: {
    setSearchResult: (state, action) => {
      // state.value = [...action.payload];
      state.value = action.payload;
      //   state.value = [...state.value, ...action.payload];
    },
    // addToSearchResult: (state, action) => {
    //   state.value.push(...action.payload);
    // },
    updateSearchResult: (state, action) => {
      // req key , update
      if (state.value) {
        state.value[action.payload.key].fav = action.payload.update;
        // state.value.get(action.payload.key).fav = action.payload.update;
      }

      // state.value[action.payload.index].fav = action.payload.value;
    },

    // resetFavInSearchResult: (state, action) => {
    //   let result = state.value.findIndex(
    //     (item, index) => item.value === action.payload.value
    //   );

    //   if (result !== -1) {
    //     state.value[result].fav = false;
    //   }
    // },
  },
});

export const {
  setSearchResult,
  updateSearchResult,
  // resetFavInSearchResult,
  // addToSearchResult,
} = searchResult.actions;

export default searchResult.reducer;
