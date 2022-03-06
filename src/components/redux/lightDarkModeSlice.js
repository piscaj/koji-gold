import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "light",
};

export const lightDarkModeSlice = createSlice({
  name: "lightDarkMode",
  initialState,
  reducers: {
    updateMode: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateMode } = lightDarkModeSlice.actions;

export default lightDarkModeSlice.reducer;
