import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import authRouter from './routers/auth.js';
import contactsRouter from './routers/contact.js';

import { getEnvVar } from './utils/getEnvVar.js';

import { UPLOAD_DIR } from './constants/index.js';

export const startServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));
  // app.use(logger);

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);
  app.use('/api-docs', swaggerDocs());

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
