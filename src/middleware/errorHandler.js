import { ApiError } from '../utils/errors.js';

export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message
      }
    });
  }

  console.error('Beklenmeyen hata:', err);
  res.status(500).json({
    error: {
      code: 5001,
      message: 'Beklenmeyen sunucu hatası'
    }
  });
}
