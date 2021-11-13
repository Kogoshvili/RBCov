require('bootstrap');
window.axios = require('axios');
const localization = require('./localization');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';

window.axios.interceptors.request.use(function (request) {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');

    if (token) {
        request.headers['Authorization'] = 'Bearer ' + token;
    }

    if (lang) {
        request.headers['Language'] = lang;
    }

    return request;
});

window.__ = (value) => {
    const lang = localStorage.getItem('lang') || 'en';
    return value?.[lang] || localization[lang]?.[value.toLowerCase()] || value;
};
