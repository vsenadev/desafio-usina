import { Request, Response } from 'express';
import { IMovie, IMovieUpdate } from '@/models/movie.model';
import { MovieService } from '@/services/movie.service';
import { UserService } from '@/services/user.service';
import { IUserUpdate } from '@/models/user.model';
import { ErrorUtils } from '@/utils/error.utils';

export class MovieController {
  static async createMovie(req: Request | any, res: Response) {
    try {
      res
        .status(201)
        .json(
          await MovieService.createMovie(req.user.email, req.body as IMovie),
        );
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async updateMovie(req: Request, res: Response) {
    try {
      res
        .status(201)
        .json(
          await MovieService.updateMovie(
            parseInt(req.params.id),
            req.body as IMovieUpdate,
          ),
        );
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async deleteMovie(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json(await MovieService.deleteMovie(parseInt(req.params.id)));
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async getRecommendedMovies(req: Request | any, res: Response) {
    try {
      res
        .status(200)
        .json(await MovieService.getRecommendedMovies(req.user.email));
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async getOneMovie(req: Request | any, res: Response) {
    try {
      res
        .status(200)
        .json(await MovieService.getOneMovie(parseInt(req.params.id)));
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async getMovieByUser(req: Request | any, res: Response) {
    try {
      res
        .status(200)
        .json(await MovieService.getMovieByUser(req.user.email));
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }
}
