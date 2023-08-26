// categoriesSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from "../../services/categories";


export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        return await fetchCategories();
    }
);


const initialState = {
    categories: JSON.parse(localStorage.getItem('categories')) || [],
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.loading = false;

                state.categories = action.payload;
                localStorage.setItem('categories', JSON.stringify(action.payload));
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
const {reducer} = categoriesSlice;

export default reducer;