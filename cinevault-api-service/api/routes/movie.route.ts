import { Router } from 'express';
import { MovieController } from '@/controllers/movie.controller';
import { authMiddleware } from '@/middleware/auth.middleware';

const router = Router();

router.post('/movie', authMiddleware, MovieController.createMovie);
router.put('/movie/:id', authMiddleware, MovieController.updateMovie);
router.delete('/movie/:id', authMiddleware, MovieController.deleteMovie);
router.get('/movie', authMiddleware, MovieController.getRecommendedMovies);
router.get('/movie/:id', authMiddleware, MovieController.getOneMovie);
router.get('/movie/all/user', authMiddleware, MovieController.getMovieByUser);

export default router;
