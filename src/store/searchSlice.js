import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    keyword: "",
    results: [],
}

// this is a combination of actions and reducers
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeyword: (state, payload) => {
            return {
                ...state,
                keyword: payload.payload,
            }
        },
        setResults: (state, payload) => {
            return {
                ...state,
                results: payload.payload,
            }
        },
    },
})

export const { setKeyword, setResults } = searchSlice.actions;
export default searchSlice.reducer;