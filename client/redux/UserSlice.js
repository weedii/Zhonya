import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.userInfo = action.payload;
    },

    signOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;
