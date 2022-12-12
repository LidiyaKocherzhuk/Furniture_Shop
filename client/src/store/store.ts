import { combineReducers, configureStore } from '@reduxjs/toolkit';

import imagesReducer from './slices/imagesSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import basketReducer from './slices/basketSlice';
import textileReducer from './slices/textileSlice';
import orderedReducer from './slices/orderedSlice';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    imagesReducer,
    productReducer,
    basketReducer,
    orderedReducer,
    textileReducer,
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
