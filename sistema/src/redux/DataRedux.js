import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
};

export const dataSlice = createSlice({
  name: 'DataRedux',
  initialState,
  reducers: {
    UPDATE_MODE: (state, action) => {
      return { ...state, mode: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { UPDATE_MODE } = dataSlice.actions;

export default dataSlice.reducer;
