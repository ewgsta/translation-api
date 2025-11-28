export class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.statusCode = this.getStatusCode(code);
    this.name = 'ApiError';
  }

  getStatusCode(code) {
    if (code >= 1000 && code < 2000) return 400;
    if (code >= 2000 && code < 3000) return 401;
    if (code >= 3000 && code < 4000) return 500;
    if (code >= 5000) return 500;
    return 500;
  }
}
