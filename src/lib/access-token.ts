import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access_token');

export const setAccessToken = (token: string) => Cookies.set('access_token', token);

export const removeAccessToken = () => Cookies.remove('access_token');
