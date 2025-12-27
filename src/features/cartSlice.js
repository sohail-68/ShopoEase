import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch user cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const token = localStorage.getItem("token");
  
  const res = await axios.get("https://angular-server-mxyp.onrender.com/api/cart/all", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
});

// ✅ Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const res = await axios.post(
        "https://angular-server-mxyp.onrender.com/api/cart/add",
        { productId, qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

// ✅ Remove item
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const token = localStorage.getItem("token");
    
    const res = await axios.delete(
      `https://angular-server-mxyp.onrender.com/api/cart/remove`,
      {
        data: { productId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return res.data;
  }
);

// ✅ CLEAR CART ACTION ADD KAREIN
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async () => {
    const token = localStorage.getItem("token");
    
    const res = await axios.delete(
      `https://angular-server-mxyp.onrender.com/api/cart/clear`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQty: 0,
    loading: false,
    error: null, // ✅ Error state add karein
  },
  reducers: {
    // ✅ Optional: Local clear cart action
    clearCartLocal: (state) => {
      state.items = [];
      state.totalQty = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalQty = state.items.reduce((sum, i) => sum + i.qty, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        // state.totalQty = state.items.length;
        state.totalQty = state.items.reduce((sum, i) => sum + i.qty, 0);


      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalQty = state.items.reduce((sum, i) => sum + i.qty, 0);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // ✅ CLEAR CART CASES ADD KAREIN
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = []; // ✅ Cart empty kar do
        state.totalQty = 0; // ✅ Total quantity 0 kar do
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;