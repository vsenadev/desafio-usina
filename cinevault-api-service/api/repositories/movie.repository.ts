import {IMovie} from '@/models/movie.model';
import {executeQuery} from '@/database/database';
import {IMessage} from '@/models/message.model';

export class MovieRepository {
  static async createMovie(data: IMovie): Promise<IMessage> {
    const query: string =
      'INSERT INTO public.movie (banner, photo, title, gender, year_release, duration, description, registration_user) VALUES ($1, $2, $3, $4, $5, $6, $7, (SELECT id FROM public.user WHERE email = $8))';
    const params: (string | number)[] = [
      data.banner,
      data.photo,
      data.title.toUpperCase().trim(),
      data.gender,
      data.year_release,
      data.duration,
      data.description,
      data.registration_user,
    ];

    await executeQuery(query, params);

    return { message: 'Filme cadastrado com sucesso!' };
  }

  static async updateMovie(
    setQuery: string,
    queryParams: string[],
  ): Promise<IMessage> {
    const query: string = `UPDATE public.movie SET ${setQuery} WHERE id = ($1)`;
    await executeQuery(query, queryParams);

    return { message: 'Filme atualizado com sucesso.' };
  }

  static async deleteMovie(id: number): Promise<IMessage> {
    const query: string = `DELETE FROM public.movie WHERE id = ($1)`;
    const param: number[] = [id];

    await executeQuery(query, param);

    return { message: 'Filme excluido com sucesso.' };
  }

  static async getRecommendedMovies(email: string): Promise<IMovie[]> {
    const hasRatingsQuery = `
        SELECT COUNT(*) as ratings_count
        FROM public.avaliation
        WHERE id_user = (SELECT id FROM public.user WHERE email = $1);
    `;
    const ratingsResult = await executeQuery(hasRatingsQuery, [email]);

    if (!ratingsResult || ratingsResult.length === 0) {
        throw new Error('Erro ao verificar as avaliações do usuário');
    }

    const ratingsCount = parseInt(ratingsResult[0].ratings_count, 10);

    if (ratingsCount === 0) {
        const genreQuery = `
            SELECT 
                m.id,
                m.title,
                m.banner,
                m.photo,
                m.gender,
                m.year_release,
                ROUND(COALESCE(AVG(a.rating), 0), 2) as average_rating
            FROM 
                public.movie m
            LEFT JOIN 
                public.avaliation a ON m.id = a.id_movie
            GROUP BY 
                m.id
            ORDER BY 
                m.gender ASC,   -- Ordena por gênero
                average_rating DESC  -- Ordena filmes dentro do gênero pela média de avaliação
        `;
        return await executeQuery(genreQuery, []);
    }

    const recommendedMoviesQuery = `
        WITH SimilarMovies AS (
            -- Subconsulta para trazer filmes baseados na similaridade com as avaliações do usuário
            SELECT 
                m.id, 
                m.title, 
                m.banner, 
                m.photo, 
                m.gender, 
                m.year_release, 
                ROUND(COALESCE(AVG(a.rating), 0), 2) AS average_rating
            FROM 
                public.movie m
            LEFT JOIN 
                public.avaliation a ON m.id = a.id_movie
            LEFT JOIN 
                public.user u ON a.id_user = u.id
            WHERE 
                a.id_user IN (
                    SELECT DISTINCT a2.id_user
                    FROM public.avaliation a1
                    JOIN public.avaliation a2 ON a1.id_movie = a2.id_movie
                    WHERE a1.id_user = (SELECT id FROM public.user WHERE email = $1) AND a1.id_user != a2.id_user
                    GROUP BY a2.id_user
                    HAVING ABS(AVG(a1.rating) - AVG(a2.rating)) < 1.5 -- Similaridade nas avaliações
                )
            GROUP BY 
                m.id
        ),
        AllMovies AS (
            -- Subconsulta para trazer todos os filmes (com ou sem avaliações)
            SELECT 
                m.id, 
                m.title, 
                m.banner, 
                m.photo, 
                m.gender, 
                m.year_release, 
                ROUND(COALESCE(AVG(a.rating), 0), 2) AS average_rating
            FROM 
                public.movie m
            LEFT JOIN 
                public.avaliation a ON m.id = a.id_movie
            GROUP BY 
                m.id
        )
        SELECT 
            m.id,
            m.title,
            m.banner,
            m.photo,
            m.gender,
            m.year_release,
            m.average_rating
        FROM 
            AllMovies m
        LEFT JOIN 
            SimilarMovies sm ON m.id = sm.id
        ORDER BY 
            sm.average_rating DESC NULLS LAST, -- Ordena pela média das avaliações dos usuários semelhantes
            m.gender ASC,                     -- Ordena por gênero
            m.title ASC;                      -- Ordenação alfabética por título
    `;

    const recommendedMovies = await executeQuery(recommendedMoviesQuery, [email]);

    if (!recommendedMovies || recommendedMovies.length === 0) {
        const fallbackGenreQuery = `
            SELECT 
                m.id,
                m.title,
                m.banner,
                m.photo,
                m.gender,
                m.year_release,
                ROUND(COALESCE(AVG(a.rating), 0), 2) as average_rating
            FROM 
                public.movie m
            LEFT JOIN 
                public.avaliation a ON m.id = a.id_movie
            GROUP BY 
                m.id
            ORDER BY 
                m.gender ASC, 
                average_rating DESC;
        `;
        return await executeQuery(fallbackGenreQuery, []);
    }

    return recommendedMovies;
  }


  static async getOneMovie(id: number): Promise<IMovie> {
    const query: string = `
      SELECT 
          m.id, 
          m.title, 
          m.banner, 
          m.photo, 
          m.gender, 
          m.year_release, 
          m.duration, 
          m.description,
          ROUND(COALESCE(AVG(a.rating), 0), 2) AS average_rating,
          -- Usando array_agg para agrupar as avaliações em um array de objetos
          ARRAY_AGG(
              JSON_BUILD_OBJECT(
                  'rating', a.rating,
                  'comment', a.comment,
                  'user_name', u.name,
                  'user_photo', u.photo,
                  'updated_at', a.updated_at
              ) ORDER BY a.updated_at DESC
          ) AS ratings
      FROM 
          public.movie AS m
      LEFT JOIN 
          public.avaliation a ON m.id = a.id_movie
      LEFT JOIN 
          public.user u ON a.id_user = u.id
      WHERE 
          m.id = $1
      GROUP BY 
          m.id
  `;

    return await executeQuery(query, [id]);
  }

  static async getMoviesByUser(email: string): Promise<IMovie[]> {
    const query: string = 'SELECT id, title, gender, year_release FROM public.movie WHERE registration_user = (SELECT id FROM public.user WHERE email = $1);';
    const param: string[] = [email];

    return await executeQuery(query, param);
  }
}
