import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await axios.get('http://localhost:3003/api/books');
    return response.data.books;
});

export const addBook = createAsyncThunk('books/addBook', async (bookData) => {
    const response = await axios.post('http://localhost:3003/api/books', bookData);
    return response.data.book;
});

export const addOrder = createAsyncThunk('orders/addOrder', async (bookId, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const response = await axios.post('http://localhost:3002/api/orders', { bookId }, {
        headers: { Authorization: `Bearer ${auth.token}` }
    });
    thunkAPI.dispatch(fetchOrders());
    return response.data;
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const response = await axios.get('http://localhost:3002/api/orders', {
        headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data.orders;
});

export const removeOrder = createAsyncThunk('orders/removeOrder', async (orderId, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    await axios.delete(`http://localhost:3002/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
    });
    return orderId;
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        books: [],
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.push(action.payload);
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter(book => book.id !== action.payload.bookId);
            })
            .addCase(addOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order._id !== action.payload);
            })
            .addCase(removeOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default ordersSlice.reducer;
