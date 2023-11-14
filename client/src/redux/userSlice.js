import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Attempt to fetch user data
      const token = Cookies.get("token");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If successful, store user data in localStorage and return the data
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      // If there is an error, use rejectWithValue to return a rejected action
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserLevels = createAsyncThunk(
  "user/fetchUserLevels",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/user/levels`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(setLevelsData(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentLevel: 1,
    levelsData: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentLevel: (state, action) => {
      state.currentLevel = action.payload;
    },
    nextLevel: (state) => {
      state.currentLevel += 1;
    },
    setLevelsData: (state, action) => {
      state.levelsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export const { setUserData, setCurrentLevel, setLevelsData, nextLevel } =
  userSlice.actions;

export default userSlice.reducer;
