import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   token: localStorage.getItem('token'), // Load the token from local storage or cookies
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      //   state.token = action.payload;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      //   state.token = null;
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
