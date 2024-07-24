import { IUser } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser = {
  provider: "",
  uid: "",
  user: {
    name: "",
    image: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.provider = action.payload.provider;
      state.uid = action.payload.uid;
      state.user.name = action.payload.user.name;
      state.user.image = action.payload.user.image;
    },
    removeUser: (state) => {
      state.provider = "";
      state.uid = "";
      state.user.name = "";
      state.user.image = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
