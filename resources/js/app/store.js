import { configureStore } from '@reduxjs/toolkit';
import authSlice from './store/authSlice';

export default configureStore({
    reducer: {
        auth: authSlice
    },
    devTools: true
});
