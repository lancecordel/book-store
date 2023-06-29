import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
    orderId: "",
    customerId: "",
    isLoggedIn: false,
    emailAddress: "",
    shippingDetails: {
        address: "",
        apt: "",
        city: "",
        state: "",
        zip: "",
        areaCode: "",
        phoneNumber: "",
    },
    items: [],
    total: 0,
    openCart: true,
    fullfilled: false,
    paymentProcessed: false,
}

// this is a combination of actions and reducers
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCustomerId: (state, customer) => {
            return {
                ...state,
                customerId: customer.payload.customerId,
                emailAddress: customer.payload.emailAddress,
                isLoggedIn: true,
            }
        },
        removeCustomerId: (state) => {
            return {
                ...state,
                customerId: "",
                isLoggedIn: false,
            }
        },
        addToCart: (state, item) => {
            const id = state.orderId === "" ? uuid() : state.orderId;
            const cartTotal = state.items.reduce((acc, cartItem) => {
                const price = parseFloat(cartItem.price);
                const total = (acc + price);
                return total;
            }, 0);
            return {
                ...state,
                orderId: id,
                total: (cartTotal + parseFloat(item.payload.price)).toFixed(2),
                items: [
                    ...state.items,
                    {
                    ...item.payload, 
                    }
                ].sort((a, b) => a.title.localeCompare(b.title)),
            }
        },
        removeFromCart: (state, deleteMe) => {
            const newList = state.items.filter( keepMe => keepMe.bookId !== deleteMe.payload.bookId);
            const newTotal = newList.reduce((acc, item) => {
                const price = parseFloat(item.price);
                const total = acc + price;
                return total;
            }, 0);
            return {
                ...state,
                orderId: newList.length === 0 ? "" : state.orderId,
                items: newList.sort((a, b) => a.title.localeCompare(b.title)),
                total: newTotal.toFixed(2),
            }
        },
        setCart: (state, cart) => {
            return {
                ...cart.payload,
            }
        },
        resetCart: (state) => {
            return {
                ...state,
                orderId: "",
                emailAddress: "",
                shippingDetails: {
                    address: "",
                    apt: "",
                    city: "",
                    state: "",
                    zip: "",
                    areaCode: "",
                    phoneNumber: "",
                },
                items: [],
                total: 0,
                openCart: true,
                fullfilled: false,
                paymentProcessed: false,
            }
        },
        updateTotal: (state, updatedCarttotal) => {
            return {
                ...state,
                total: (parseFloat(updatedCarttotal.payload).toFixed(2)),
            }
        },
        updateQuantity: (state, book) => {
            const newList = state.items.filter(item => item.bookId !== book.payload.bookId);
            return {
                ...state,
                items: [
                    ...newList,
                    {
                        ...book.payload,
                    }
                ].sort((a, b) => a.title.localeCompare(b.title))
            };
        },
    },
})

export const { 
    addToCart, 
    removeFromCart, 
    updateTotal, 
    updateQuantity, 
    addCustomerId,
    removeCustomerId, 
    resetCart,
    setCart,
} = cartSlice.actions;
export default cartSlice.reducer;