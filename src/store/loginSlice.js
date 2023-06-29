import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

// this is a combination of actions and reducers
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoggedIn: (state, customer) => {
            const { password, ...others } = customer.payload;
            return {
                ...others,
                isLoggedIn: true,
            }
        },
        setLoggout: () => {
            return {
                isLoggedIn: false,
            }
        },
    },
})

export const { setLoggedIn, setLoggout } = loginSlice.actions;
export default loginSlice.reducer;