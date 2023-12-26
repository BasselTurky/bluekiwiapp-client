import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "https://pixabay.com";

const pageUrl = createSlice({
  name: "pageUrl",
  initialState: { value: initialStateValue },
  reducers: {
    setPageUrl: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPageUrl } = pageUrl.actions;

export default pageUrl.reducer;
