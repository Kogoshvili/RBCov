import { createSlice } from '@reduxjs/toolkit';

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        lang: localStorage.getItem('lang') || 'en'
    },
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload;
            localStorage.setItem('lang', action.payload);
        },
        resetLang: (state) => {
            state.lang = 'en';
            localStorage.setItem('lang', 'en');
        }
    }
});

export const { setLang, resetLang } = generalSlice.actions;

export default generalSlice.reducer;

export const getLang = state => state.general.lang;
