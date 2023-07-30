import {createSlice} from "@reduxjs/toolkit";


let initialState = [];
if (typeof window !== 'undefined') {
    if (localStorage.getItem("categories")) {
        initialState = JSON.parse(localStorage.getItem("categories"))
    } else {
        initialState = []
    }
}


const catSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCats: (state, action) => {
            return action.payload;
        },

    },
});


const {reducer, actions} = catSlice;

export const {addCats} = actions
export default reducer;