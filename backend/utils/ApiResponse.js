/*
 * Represents a standard API success response.
 */
class ApiResponse {
    /**
     * Creates an instance of ApiResponse.
     *
     * @param {number} statusCode - HTTP status code (e.g., 200, 201).
     * @param {*} data - The actual data to return (object, array, etc.).
     * @param {string} [message="Success"] - Optional message for the response.
     */
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // true if status is 2xx or 3xx
    }
}

export { ApiResponse };
