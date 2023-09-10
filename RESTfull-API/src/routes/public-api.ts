import express from 'express';
import userController from '../controller/user-controller';

const publicRouter = express.Router();
publicRouter.post('/api/v1/users', userController.register);
publicRouter.post('/api/v1/users/login', userController.login);

export {
  publicRouter
}