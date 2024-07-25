import { IAuthUser, IUser } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserStoreProps {
  user: {
    uid: string;
    name: string;
    image: string;
  };
}

const initialState: UserStoreProps = {
  user: {
    uid: "",
    name: "",
    image: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthUser>) => {
      state.user.uid = String(action.payload.userId);
      state.user.name = action.payload.name;
      state.user.image = action.payload.profileImg;
    },
    removeUser: (state) => {
      state.user.uid = "";
      state.user.name = "";
      state.user.image = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
