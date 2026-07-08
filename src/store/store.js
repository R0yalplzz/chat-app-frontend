import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "../features/loaderSlice";
import { userSlice } from "../features/userSlice";

export const store = configureStore({
  reducer: {
    loader: loaderSlice.reducer,
    user: userSlice.reducer,
  },
});
