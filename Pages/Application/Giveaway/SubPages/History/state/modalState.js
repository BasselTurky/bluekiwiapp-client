import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  isVisible: false,
  content: [],
};

const modalState = createSlice({
  name: "modalState",
  initialState: { value: initialStateValue },
  reducers: {
    setIsVisible: (state, action) => {
      state.value.isVisible = action.payload;
    },
    setContent: (state, action) => {
      state.value.content = action.payload;
    },
  },
});

export const { setIsVisible, setContent } = modalState.actions;

export default modalState.reducer;
