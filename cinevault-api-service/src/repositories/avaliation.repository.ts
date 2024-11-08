import { IAvaliation } from '@/models/avaliation.model';
import { IMessage } from '@/models/message.model';
import { executeQuery } from '@/database/database';

export class AvaliationRepository {
  static async createAvaliation(data: IAvaliation): Promise<IMessage> {
    const query: string =
      'INSERT INTO public.avaliation (id_user, id_movie, rating, comment) VALUES ($1, $2, $3, $4)';
    const values: (string | number | null)[] = [
      data.id_user,
      data.id_movie,
      data.rating,
      data.comment ? data.comment : null,
    ];

    await executeQuery(query, values);

    return { message: 'Avaliação cadastrada com sucesso.' };
  }

  static async updateAvaliation(
    setQuery: string,
    queryParams: string[],
  ): Promise<IMessage> {
    const query: string = `UPDATE public.avaliation SET ${setQuery} WHERE id = ($1)`;
    await executeQuery(query, queryParams);

    return { message: 'Avaliação atualizada com sucesso.' };
  }

  static async deleteAvaliation(id: number): Promise<IMessage> {
    const query: string = 'DELETE FROM public.avaliation WHERE id = ($1)';
    const param: number[] = [id];

    await executeQuery(query, param);

    return { message: 'Avaliação excluida com sucesso.' };
  }
}
