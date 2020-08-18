import { createSlice } from "@reduxjs/toolkit";

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("/current_user");

  dispatch(setCurrentUser(res.data));
};

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.googleId || null;
    },
  },
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
