import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {
    cardItems: localStorage.getItem("card") 
    ? JSON.parse(localStorage.getItem("card")).cardItems
    : [],
    total: localStorage.getItem("card") 
    ? JSON.parse(localStorage.getItem("card")).total
    : 0,
    tax: 8
  },
  reducers: {
    addProduct: (state, action) => {
      const findCardItem = state.cardItems.find(
        (item) => item._id === action.payload._id
      );

      if (findCardItem) {
        findCardItem.quantity = findCardItem.quantity + 1;
      } else {
        state.cardItems.push(action.payload)
      }

      state.total += action.payload.price;
    },

    deleteCard: (state, action) => {
      state.cardItems = state.cardItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    incerase: (state, action) => {
      const cardItem = state.cardItems.find(
        (item) => item._id === action.payload._id
      );

      cardItem.quantity += 1;
      state.total += cardItem.price;
    },
    decrase: (state, action) => {
      const cardItem = state.cardItems.find(
        (item) => item._id === action.payload._id
      );

      cardItem.quantity -= 1;
      if (cardItem.quantity === 0) {
        state.cardItems = state.cardItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= cardItem.price;
    },
    reset: (state, action) => {
      state.cardItems = [];
      state.total = 0;
    }
  },
});

export const { addProduct, deleteCard, incerase, decrase, reset } = cardSlice.actions;
export default cardSlice.reducer;