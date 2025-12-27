import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/features/auth/authSlice';
import teamReducer from '../src/features/Team/Teamslice';
import cartReducer from '../src/features/cartSlice';
import searchSlice from '../src/features/searchSlice';
import orderSlice from '../src/features/order/orderSlice';

 const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    cart:cartReducer,
    search: searchSlice,
    order: orderSlice,
  },
});

export default store;