import express from 'express';
import multer from 'multer';
import { validateApiKey } from '../middleware/auth.js';
import { handleTranslation } from '../controllers/translationController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/translate', validateApiKey, upload.single('file'), async (req, res, next) => {
  try {
    await handleTranslation(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
