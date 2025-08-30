/*
 * Custom API error class for structured error handling.
 */
class ApiError extends Error {
    /**
     * Creates an instance of ApiError.
     *
     * @param {number} statusCode - HTTP status code (e.g., 404, 500).
     * @param {string} [message="Something went wrong"] - Error message.
     * @param {Array} [errors=[]] - Additional error details (validation errors, etc.).
     * @param {string} [stack=""] - Optional stack trace for debugging.
     */
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message); // Call the base Error constructor

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        // If stack is provided use it; otherwise capture the current stack trace
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
