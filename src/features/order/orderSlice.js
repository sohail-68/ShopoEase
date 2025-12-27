// features/order/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://angular-server-mxyp.onrender.com/api/orders';

// Helper function for auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`
  };
};

// Create Order
export const createOrder = createAsyncThunk(
  'order/create',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API_URL, orderData, {
        headers: getAuthHeaders()
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Order creation failed'
      );
    }
  }
);

// Get My Orders
export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/myorders`, {
        headers: getAuthHeaders()
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

// Get Order Details
export const getOrderDetails = createAsyncThunk(
  'order/getDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/${orderId}`, {
        headers: getAuthHeaders()
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order details'
      );
    }
  }
);

// Mark Order as Paid
export const markOrderAsPaid = createAsyncThunk(
  'order/markPaid',
  async ({ orderId, paymentResult }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/${orderId}/pay`,
        { paymentResult },
        { headers: getAuthHeaders() }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Payment update failed'
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [], // For order list
    currentOrder: null, // For single order details
    loading: false,
    error: null
  },
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Mark Order as Paid
      .addCase(markOrderAsPaid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markOrderAsPaid.fulfilled, (state, action) => {
        state.loading = false;
        // Update the order in orders list if it exists
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        // Update currentOrder if it's the same order
        if (state.currentOrder && state.currentOrder._id === action.payload._id) {
          state.currentOrder = action.payload;
        }
        state.error = null;
      })
      .addCase(markOrderAsPaid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrderError, resetCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;