import jwt from 'jsonwebtoken';

export const generate = (user,expiresIn="7d") => {
    try {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn,
            algorithm: "HS256",
        });
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
}
export const verify = (token) => {
    try {
        // one algorithm only, so a token can't pick a weaker one for itself
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');

    }
}
export default {
    generate,
    verify
}