import jwt from 'jsonwebtoken';

export const generate = (user,expiresIn="7d") => {
    try {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn,
        });
        return token;
    } catch (error) {
        throw new Error('Error generating token');
    }
}
export const verify = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.log({token})
        throw new Error('Invalid token');

    }
}
export default {
    generate,
    verify
}