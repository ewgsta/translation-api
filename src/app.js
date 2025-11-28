import express from 'express';
import { config } from './config/config.js';
import { errorHandler } from './middleware/errorHandler.js';
import translationRoutes from './routes/translationRoutes.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'translation-api' });
});

app.use('/api', translationRoutes);

app.use(errorHandler);

export function start() {
  if (!config.openRouterApiKey) {
    console.error('OPENROUTER_API_KEY tanımlanmamış!');
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log(`translation-api: http://localhost:${config.port}`);
  });
}

export default app;
