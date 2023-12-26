import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = 0;

const coins = createSlice({
  name: "coins",
  initialState: { value: initialStateValue },
  reducers: {
    setCoins: (state, action) => {
      state.value = action.payload;
    },
    addCoin: (state, action) => {
      state.value = state.value + action.payload;
    },
    consumeCoins: (state, action) => {
      state.value = state.value - action.payload;
    },
  },
});

export const { setCoins, addCoin, consumeCoins } = coins.actions;

export default coins.reducer;
