import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false;

const modalVisible = createSlice({
  name: "modalVisible",
  initialState: { value: initialStateValue },
  reducers: {
    setModalVisible: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setModalVisible } = modalVisible.actions;

export default modalVisible.reducer;
