import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  admin: null,
  user: null,
  basket: [],
  search: '',
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
    UPDATE_USER: (state, action) => {
      return { ...state, user: action.payload };
    },
    UPDATE_BASKET: (state, action) => {
      return { ...state, basket: action.payload };
    },
    UPDATE_SEARCH: (state, action) => {
      return { ...state, search: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  UPDATE_MODE,
  UPDATE_ADMIN,
  UPDATE_USER,
  UPDATE_BASKET,
  UPDATE_SEARCH,
} = dataSlice.actions;

export default dataSlice.reducer;
