import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware';
import { publicRouter } from '../routes/public-api';
import { userRouter } from '../routes/api';

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);