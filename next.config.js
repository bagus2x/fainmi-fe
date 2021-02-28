module.exports = {
    trailingSlash: false,
    env: {
        APP_NAME: 'FAINMI',
        API_DEV: 'http://192.168.1.111:8080',
        API_PROD: 'fainmi.herokuapp.com'
    },
    images: {
        domains: ['192.168.1.111', 'fainmi.vercel.app', 'fainmi.herokuapp.com']
    }
};
