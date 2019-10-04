/* Error types */
class SystemError extends Error {
	constructor(data, message, code) {
		super();

		this.name = 'SystemError';
		this.message = message || 'System-level error occurred';
		this.data = data || {};
		this.status = 500;
		this.code = code;
	}
}

class ValidationError extends Error {
	constructor(data, message) {
		super();
		this.name = 'ValidationError';
		this.message = message || 'Error when validating data';
		this.data = data || {};
		this.status = 400;
	}
}

/* Handler middleware */
async function errorHandler(err, req, res, next) {
    const { message, data, status = 500 } = err;
    if (res.headersSent) return next(err);
    res.status(status).json({ status, message, data }).send();
    return undefined;
}


module.exports = {
	SystemError,
    ValidationError,
    errorHandler,
};
