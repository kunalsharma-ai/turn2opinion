export default function setOrigin(req, res, next) {
    req.origin = req.headers.host;
    next();
}