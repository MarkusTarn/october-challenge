module.exports = async function (req, res, next) {
    req.response = (statusCode, message, data) => {
        return res.status(statusCode).json({
            status: statusCode,
            message: message,
            data,
        });
    };
    next();
}