import { config } from '../config/config.js';
import { ApiError } from '../utils/errors.js';

export function validateApiKey(req, res, next) {
  const apiKey = config.openRouterApiKey;

  if (!apiKey) {
    throw new ApiError(2001, 'API anahtarı eksik');
  }

  if (typeof apiKey !== 'string' || apiKey.length < 10) {
    throw new ApiError(2003, 'API anahtarı formatı hatalı');
  }

  req.apiKey = apiKey;
  next();
}
