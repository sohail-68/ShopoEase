import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSuggestions = createAsyncThunk("search/suggestions", async (query) => {
  const res = await axios.get(`https://angular-server-mxyp.onrender.com/api/products/query?query=${query}`,{
    headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
        
  }
  });
  return res.data;
});

export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ q, page = 1, minPrice, maxPrice, brand }) => {
    const params = new URLSearchParams();
    if (q) params.append("search", q);
    if (brand) params.append("brand", brand);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    params.append("page", page);
    params.append("limit", 4);

    const res = await fetch(`https://angular-server-mxyp.onrender.com/api/products?${params.toString()}`);
    return await res.json();
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: { suggestions: [], results: [], loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.results = action.payload.products;
      state.totalPages = action.payload.pages;
      state.currentPage = action.payload.page;
      });
  },
});

export default searchSlice.reducer;
