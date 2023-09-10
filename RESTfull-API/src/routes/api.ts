import express from 'express';
import userController from '../controller/user-controller';
import contactController from '../controller/contact-controller';
import addressController from '../controller/address-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const userRouter = express.Router();
userRouter.use(authMiddleware);

// ? User API
userRouter.get('/api/v1/users/current', userController.get);
userRouter.patch('/api/v1/users/current', userController.update);
userRouter.delete('/api/v1/users/logout', userController.logout);

// ? Contact API
userRouter.post('/api/v1/contacts', contactController.create);
userRouter.get('/api/v1/contacts/:contactId', contactController.get);
userRouter.put('/api/v1/contacts/:contactId', contactController.update);
userRouter.delete('/api/v1/contacts/:contactId', contactController.remove);
userRouter.get('/api/v1/contacts', contactController.search);

// ? Address API
userRouter.post('/api/v1/contacts/:contactId/addresses', addressController.create)
userRouter.get('/api/v1/contacts/:contactId/addresses/:addressId', addressController.get)
userRouter.put('/api/v1/contacts/:contactId/addresses/:addressId', addressController.update)
userRouter.delete('/api/v1/contacts/:contactId/addresses/:addressId', addressController.remove)
userRouter.get('/api/v1/contacts/:contactId/addresses', addressController.list)


export {
  userRouter
}