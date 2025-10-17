class ApiResponse {
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode; // Stores the HTTP status code (200, 400, 500, etc.)
        this.data = data; // Stores the actual response data
        this.message = message; // A short message about the response
        this.success = statusCode < 400; // Boolean flag (true for success, false for errors)
    }
}

export { ApiResponse };