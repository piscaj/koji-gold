import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./feedbackSlice";
import LightDarkModeReducer from "./lightDarkModeSlice";

export const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    lightDarkMode: LightDarkModeReducer,
  },
});
