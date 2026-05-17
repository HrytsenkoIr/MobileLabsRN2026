import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    saveUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveUserData } = usersSlice.actions;

export default usersSlice.reducer;