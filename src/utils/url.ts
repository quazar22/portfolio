export function getApiUrl() {
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
    } else {
        return "https://contact.therandomsgenerator.com";
    }
}

export function getCDN() {
    return 'https://cdn.sanity.io/images/tki5mjz8/production/';
}