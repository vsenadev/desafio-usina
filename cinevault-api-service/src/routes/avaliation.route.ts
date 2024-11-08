import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import { AvaliationController } from '@/controllers/avaliation.controller';

const router = Router();

router.post(
  '/avaliation',
  authMiddleware,
  AvaliationController.createAvaliation,
);
router.put(
  '/avaliation/:id',
  authMiddleware,
  AvaliationController.updateAvaliation,
);
router.delete(
  '/avaliation/:id',
  authMiddleware,
  AvaliationController.deleteAvaliation,
);

export default router;
