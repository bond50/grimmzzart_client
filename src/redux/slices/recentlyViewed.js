// recentlyViewedSlice.js

import {createSlice} from '@reduxjs/toolkit';

const localStorageKey = 'recentlyViewedProducts';

// Retrieve the recently viewed products from the localStorage
const getLocalStorageState = () => {
  const localStorageState = localStorage.getItem(localStorageKey);
  const localStorageTime = localStorage.getItem(localStorageKey + 'Time');

  if (localStorageState && localStorageTime) {
    const currentTime = new Date();
    const savedTime = new Date(JSON.parse(localStorageTime));

    const differenceInHours = Math.abs(currentTime - savedTime) / 36e5;

    if (differenceInHours < 24) {
      return JSON.parse(localStorageState);
    }
  }

  return [];
};

const initialState = {
    recentlyViewed: getLocalStorageState(),
};

const recentlyViewedSlice = createSlice({
    name: 'recentlyViewed',
    initialState,
    reducers: {
        addToRecentlyViewed: (state, action) => {
            const product = action.payload;
            const updatedViewed = [product, ...state.recentlyViewed.filter(p => p._id !== product._id)];

            // Ensure that we only keep the first 6 recently viewed products
            state.recentlyViewed = updatedViewed.slice(0, 6);

            // Save the updated state and the current time to the localStorage
            localStorage.setItem(localStorageKey, JSON.stringify(state.recentlyViewed));
            localStorage.setItem(localStorageKey + 'Time', JSON.stringify(new Date()));
        },
        clearRecentlyViewed: (state) => {
            state.recentlyViewed = [];
            // Clear the recently viewed products from the localStorage
            localStorage.removeItem(localStorageKey);
            localStorage.removeItem(localStorageKey + 'Time');
        },
    },
});

const { reducer, actions } = recentlyViewedSlice;

export const { addToRecentlyViewed, clearRecentlyViewed } = actions;
export default reducer;
