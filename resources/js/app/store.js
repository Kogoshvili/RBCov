import { configureStore } from '@reduxjs/toolkit';
import authSlice from './store/authSlice';
import generalSlice from './store/generalSlice';

export default configureStore({
    reducer: {
        auth: authSlice,
        general: generalSlice
    },
    devTools: true
});

