export function getApiUrl() {
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_URL) {
        return process.env.REACT_APP_API_URL;
    } else {
        return "https://api.therandomsgenerator.com";
    }
}