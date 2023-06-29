import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import loadingSlice from "./loadingSlice";
import searchSlice from "./searchSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import loginSlice from "./loginSlice";

const persistConfig = {
    key: 'root',
    storage,
    
  };

  const rootReducer = combineReducers({
    loading: loadingSlice,
    search: searchSlice,
    cart: cartSlice,
    product: productSlice,
    login: loginSlice,
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
  });
  
  export const persistor = persistStore(store);

// export const store = configureStore({
//     reducer: {
//         loading: loadingSlice,
//         search: searchSlice,
//         cart: cartSlice,
//         product: productSlice,
//     },
// })