import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
  },
});
