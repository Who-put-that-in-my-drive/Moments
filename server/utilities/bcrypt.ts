import * as bcrypt from 'bcrypt';

export const getHashedValue = async (secret: string): Promise<string> => {
    return bcrypt.hash(secret, await bcrypt.genSalt(12));
};

export const validatePassword = async (actual: string, expected: string): Promise<boolean> => {
    return await bcrypt.compare(actual, expected);
};
