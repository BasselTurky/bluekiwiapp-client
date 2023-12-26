import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const isViewLogin = createSlice({
  name: "isViewLogin",
  initialState: { value: initialStateValue },
  reducers: {
    setIsViewLogin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsViewLogin } = isViewLogin.actions;

export default isViewLogin.reducer;
