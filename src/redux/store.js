import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Lưu trữ trong localStorage
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice'
import orderReducer from './slices/orderSlice'


// Cấu hình cho Redux Persist
const persistConfig = {
    key: 'root', // Tên key lưu trong storage
    storage,     // Sử dụng localStorage để lưu
    whitelist: ['user', 'order'], // Chỉ lưu slice user
};

// Gộp các reducer lại
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer, // Để nguyên reducer user
    order: orderReducer
});

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Tạo persistor để sử dụng với PersistGate
export const persistor = persistStore(store);
