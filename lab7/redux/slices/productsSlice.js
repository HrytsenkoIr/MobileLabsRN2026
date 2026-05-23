import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      title: "Ноутбук",
      description: "Gaming laptop",
      price: 50000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWQfR1M5cGMzxS7VEYMDPJdfh65r_uMmbqDw&s",
    },
    {
      id: 2,
      title: "Телефон",
      description: "Smartphone",
      price: 25000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAANwyacKeSF5HwdRee8GeqaLyhBGVpmq0Vg&s",
    },
    {
      id: 3,
      title: "Навушники",
      description: "Wireless headphones",
      price: 5000,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYXTEoWW_c8s3ZYHr5ugTJzoJxvqC3tF2wRQ&s",
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;