import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './DataRedux';

export default configureStore({
  reducer: { DataRedux: dataReducer },
});
