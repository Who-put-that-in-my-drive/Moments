export const successResponse = (response: Response): boolean => {
    return response.status >= 200 && response.status < 400;
};
