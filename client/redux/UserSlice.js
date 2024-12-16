import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userInfo: null,
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },

    deleteToken: (state) => {
      state.token = null;
      state.userInfo = null;
    },

    saveUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { saveToken, deleteToken, saveUser } = userSlice.actions;
export default userSlice.reducer;
