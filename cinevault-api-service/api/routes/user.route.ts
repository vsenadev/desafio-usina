import { Router } from 'express';
import { UserController } from '@/controllers/user.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const router = Router();

router.post('/user', UserController.createUser);
router.put('/login', UserController.login);
router.put('/user', authMiddleware, UserController.updateUser);
router.delete('/user', authMiddleware, UserController.deleteUser);
router.get('/user', authMiddleware, UserController.getUserInformation);

export default router;
