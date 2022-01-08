import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JwtToken } from "src/models/Token";
import { User } from "src/models/User";
import { RootState } from "..";

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as {
    user: null | User;
    token: null | JwtToken;
  },
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: JwtToken }>
    ) => {
      state.user = user;
      state.token = token;
    }
  },
  extraReducers: (builder) => {}
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
