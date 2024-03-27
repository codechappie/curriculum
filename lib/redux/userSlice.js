import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "prueba",
  loading: true,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserData: (state) => {
      return state.name
    },
    setUserData: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { getUserData, setUserData } = userSlice.actions;

export default userSlice.reducer;