import { IMovie, IMovieUpdate } from '@/models/movie.model';
import {
  idMovieSchema,
  movieSchema,
  updateMovieSchema,
} from '@/schemas/movie.schema';
import { ErrorUtils } from '@/utils/error.utils';
import { MovieRepository } from '@/repositories/movie.repository';
import { IMessage } from '@/models/message.model';
import { mountSqlUpdateKeysAndValues } from '@/database/database';
import { emailUserSchema } from '@/schemas/user.schema';

export class MovieService {
  static async createMovie(email: string, data: IMovie): Promise<IMessage> {
    data.registration_user = email;
    const validation = movieSchema.safeParse(data);

    await ErrorUtils.validationError(validation);

    return await MovieRepository.createMovie(data);
  }

  static async updateMovie(id: number, data: IMovieUpdate): Promise<IMessage> {
    const validation = updateMovieSchema.safeParse(data);
    await ErrorUtils.validationError(validation);

    if (data.title) {
      data.title = data.title?.toUpperCase().trim();
    }

    const { setQuery, queryParams } = mountSqlUpdateKeysAndValues(id, data);

    return await MovieRepository.updateMovie(setQuery, queryParams);
  }

  static async deleteMovie(id: number): Promise<IMessage> {
    const validation = idMovieSchema.safeParse({ id: id });
    await ErrorUtils.validationError(validation);

    return await MovieRepository.deleteMovie(id);
  }

  static async getRecommendedMovies(email: string): Promise<IMovie[]> {
    const validation = emailUserSchema.safeParse({ email: email });
    await ErrorUtils.validationError(validation);

    return await MovieRepository.getRecommendedMovies(email);
  }

  static async getOneMovie(id: number): Promise<IMovie> {
    const validation = idMovieSchema.safeParse({ id: id });
    await ErrorUtils.validationError(validation);

    return await MovieRepository.getOneMovie(id);
  }

  static async getMovieByUser(email: string): Promise<IMovie[]> {
    const validation = emailUserSchema.safeParse({ email: email });
    await ErrorUtils.validationError(validation);

    return await MovieRepository.getMoviesByUser(email);
  }
}
