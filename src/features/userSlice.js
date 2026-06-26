// the main tassk of slice is to initialize variable and create reducer function to update the variable

import { createSlice } from "@reduxjs/toolkit";

/* const initialStateValue = {
 loader: false,
} */

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, allUsers: [], allChats: [], selectedChat: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },

    setAllChats: (state, action) => {
      state.allChats = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setUser, setAllUsers, setAllChats, setSelectedChat } =
  userSlice.actions;

export default userSlice.reducer;
