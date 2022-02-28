import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{ id: "null", value: "null", type: "null" }],
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    updateObject: (state, action) => {
      var foundIndex = state.value.findIndex((x) => x.id === action.payload.id);

      // If we have a matching element value at id, overwrite it
      if (foundIndex >= 0) {
        state.value[foundIndex].value = action.payload.value;
      }
      // If we don't have a match lets push the element into the array
      else {
        state.value.push(action.payload);
      }
    },
  },
});

export const { updateObject } = feedbackSlice.actions;

export default feedbackSlice.reducer;
