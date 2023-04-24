import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  admin: null,
};

export const dataSlice = createSlice({
  name: 'DataRedux',
  initialState,
  reducers: {
    UPDATE_MODE: (state, action) => {
      return { ...state, mode: action.payload };
    },
    UPDATE_ADMIN: (state, action) => {
      return { ...state, admin: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { UPDATE_MODE, UPDATE_ADMIN } = dataSlice.actions;

export default dataSlice.reducer;
