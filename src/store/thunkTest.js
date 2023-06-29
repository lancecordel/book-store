import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuid } from "uuid";

// Asynchronous action using Redux Thunk
export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (item, { dispatch }) => {
    try {
      // Perform asynchronous operations here (e.g., API calls)
      const response = await axios.post('https://api.example.com/items', {
        method: 'POST',
        body: JSON.stringify(item),
      });
      const data = await response.json();

      // Dispatch additional synchronous actions if needed
      dispatch(someAction(data));

      return data;
    } catch (error) {
      // Handle errors if needed
      dispatch(someErrorAction(error));
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    orderId: "",
    customerId: "",
    registeredUser: false,
    emailAddress: "",
    items: [],
    total: 0,
    fulfilled: false,
    paid: false,
  },
  reducers: {
    // ... (other reducer cases)

    // Modified addToCart case to use addToCartAsync
    addToCart: addToCartAsync.pending, // Set initial state as pending

    // ... (other reducer cases)
  },
  extraReducers: (builder) => {
    // ... (other extraReducers cases)

    // Handle fulfilled state of addToCartAsync
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.orderId = state.orderId === "" ? uuid() : state.orderId;
      state.total = (parseFloat(state.total) + parseFloat(action.payload.price)).toFixed(2);
      state.items.push(action.payload);
      state.items.sort((a, b) => a.title.localeCompare(b.title));
    //   state.fulfilled = true;
    });

    // Handle rejected state of addToCartAsync
    builder.addCase(addToCartAsync.rejected, (state) => {
      state.fulfilled = false;
    });
  },
});

// ... (other exports)
