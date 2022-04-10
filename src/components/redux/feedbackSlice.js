import { createSlice } from "@reduxjs/toolkit";
import postal from "postal";

const initialState = {
  value: [{ id: "null", value: "null", type: "null" }],
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    updateObject: (state, action) => {
      var foundIndex = state.value.findIndex((x) => x.id === action.payload.id);
      if (action.payload.type === "bool") {
        postal.publish({
          channel: "boolean",
          topic: action.payload.id,
          data: {
            value: action.payload.value,
          },
        });
      } else if (action.payload.type === "string") {
        postal.publish({
          channel: "string",
          topic: action.payload.id,
          data: {
            value: action.payload.value,
          },
        });
      } else if (action.payload.type === "number") {
        postal.publish({
          channel: "number",
          topic: action.payload.id,
          data: {
            value: action.payload.value,
          },
        });
      }

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
