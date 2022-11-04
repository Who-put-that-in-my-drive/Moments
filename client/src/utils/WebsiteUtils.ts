export const getServerUrl = (): string => {
    return process.env.REACT_APP_DEV_SERVER_URL || 'https://momentsimagegallery.site';
};