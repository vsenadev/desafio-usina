import { executeQuery } from '@/database/database';
import { ILogin, IUser, IUSerInformation } from '@/models/user.model';
import { IMessage } from '@/models/message.model';

export class UserRepository {
  static async createUser(user: IUser): Promise<IMessage> {
    const query: string =
      'INSERT INTO public.user (name, photo, email, password) VALUES ($1, $2, $3, $4)';
    const values: string[] = [user.name, user.photo, user.email, user.password];

    await executeQuery(query, values);
    return { message: 'Usuário cadastrado com sucesso.' };
  }

  static async login(data: ILogin): Promise<ILogin> {
    const query: string = 'SELECT password FROM public.user WHERE email = ($1)';
    const values: string[] = [data.email];
    const result = await executeQuery(query, values);

    return result[0];
  }

  static async updateUser(
    setQuery: string,
    queryParams: string[],
  ): Promise<IMessage> {
    const query: string = `UPDATE public.user SET ${setQuery} WHERE email = ($1)`;
    await executeQuery(query, queryParams);

    return { message: 'Usuário atualizado com sucesso.' };
  }

  static async deleteUser(email: string): Promise<IMessage> {
    const query: string = `DELETE FROM public.user WHERE email = $1`;
    const param: string[] = [email];

    await executeQuery(query, param);

    return { message: 'Usuário excluido com sucesso.' };
  }

  static async getUserInformation(
    email: string,
  ): Promise<IUSerInformation | any> {
    const query: string = `SELECT photo, name, email FROM public.user WHERE email = $1`;
    const param: string[] = [email];

    const result = await executeQuery(query, param);

    return result[0];
  }
}
