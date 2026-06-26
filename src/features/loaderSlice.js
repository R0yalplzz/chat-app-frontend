// the main tassk of slice is to initialize variable and create reducer function to update the variable

import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
 loader: false,
}

export const loaderSlice = createSlice({
    name: "loader",
    initialState: initialStateValue,
    reducers: {
        showLoader: (state) => {
            state.loader = true;
          },
          hideLoader: (state) => {
            state.loader = false;
          },
    },
});

 export const {showLoader,hideLoader} = loaderSlice.actions;

export default loaderSlice.reducer;