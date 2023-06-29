import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookId: "",
    by: "",
    // byUpperCase: "",
    title: "",
    // titleUpperCase: "",
    publicationDate: "",
    // publicationDateUpperCase: "",
    format: "",
    // formatUpperCase: "",
    category: "",
    // categoryUpperCase: "",
    trimSize: "",
    // trimSizeUpperCase: "",
    isbn: "",
    // isbnUpperCase: "",
    price: "",
    // priceUpperCase: "",
    details: "",
    // detailsUpperCase: "",
    imageUrl: "",
    // inCart: false,
}

// this is a combination of actions and reducers
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, item) => {
            return {
                // bookId: item.payload.bookId,
                // by: item.payload.by,
                // title: item.payload.title,
                // publicationDate: item.payload.publicationDate,
                // format: item.payload.format,
                // category: item.payload.category,
                // trimSize: item.payload.trimSize,
                // isbn: item.payload.isbn,
                // price: item.payload.price,
                // // details: item.payload.details,
                // imageUrl: item.payload.imageUrl,
                // inCart: false,
                ...state,
                ...item.payload
            }
        },
    },
})

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;