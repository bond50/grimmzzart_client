// categoriesSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchBrandsCategoriesSubs} from "../../services/brandCategorySubs.service";


export const getBrandsCategoriesSubs = createAsyncThunk(
    'brandsCategoriesSubs/getBrandsCategoriesSubs',
    async () => {
        return await fetchBrandsCategoriesSubs();
    }
);


const initialState = {
    data: JSON.parse(localStorage.getItem('brandsCategoriesSubs')) || [],
    loading: false,
    error: null,
};

const brandsCategoriesSubsSlice = createSlice({
    name: 'brandsCategoriesSubs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrandsCategoriesSubs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBrandsCategoriesSubs.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getBrandsCategoriesSubs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
const {reducer} = brandsCategoriesSubsSlice;

export default reducer;