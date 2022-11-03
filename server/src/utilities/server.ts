export const getCurrentDateTime = () => {
    return Math.floor(new Date().getTime() / 1000.0); //Epoch in milliseconds
};
