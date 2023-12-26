import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = 0;

const galleryLastScrollPosition = createSlice({
  name: "galleryLastScrollPosition",
  initialState: { value: initialStateValue },
  reducers: {
    setGalleryLastScrollPosition: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGalleryLastScrollPosition } =
  galleryLastScrollPosition.actions;

export default galleryLastScrollPosition.reducer;
