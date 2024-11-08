import {
  ILogin,
  IUser,
  IUSerInformation,
  IUserUpdate,
} from '@/models/user.model';
import {
  emailUserSchema,
  loginSchema,
  updateUserSchema,
  usersSchema,
} from '@/schemas/user.schema';
import { UserRepository } from '@/repositories/user.repository';
import { IMessage } from '@/models/message.model';
import { CryptographyUtils } from '@/utils/cryptography.utils';
import { ErrorUtils } from '@/utils/error.utils';
import { authService } from '@/services/auth.service';
import { mountSqlUpdateKeysAndValues } from '@/database/database';

export class UserService {
  static async createUser(data: IUser): Promise<IMessage> {
    const validation = usersSchema.safeParse(data);

    await ErrorUtils.validationError(validation);

    data.password = await CryptographyUtils.encryptPassword(data.password);

    return await UserRepository.createUser(data);
  }

  static async login(data: ILogin): Promise<IMessage> {
    const validation = loginSchema.safeParse(data);

    await ErrorUtils.validationError(validation);

    const userInfo: ILogin = await UserRepository.login(data);

    if (!userInfo) {
      throw new Error('Usuário não encontrado, por favor verificar.');
    } else if (
      userInfo &&
      (await CryptographyUtils.comparePassword(
        data.password,
        userInfo.password,
      ))
    ) {
      return { token: authService.generateToken({ email: data.email }) };
    } else {
      throw new Error('Por favor, verificar suas credenciais de acesso.');
    }
  }

  static async updateUser(email: string, data: IUserUpdate): Promise<IMessage> {
    const validation = updateUserSchema.safeParse(data);
    await ErrorUtils.validationError(validation);

    if (data.password) {
      data.password = await CryptographyUtils.encryptPassword(data.password);
    }

    delete data.confirm_password;

    const { setQuery, queryParams } = mountSqlUpdateKeysAndValues(email, data);

    return await UserRepository.updateUser(setQuery, queryParams);
  }

  static async deleteUser(email: string): Promise<IMessage> {
    const validation = emailUserSchema.safeParse({ email: email });
    await ErrorUtils.validationError(validation);

    return await UserRepository.deleteUser(email);
  }

  static async getUserInformation(email: string): Promise<IUSerInformation> {
    const validation = emailUserSchema.safeParse({ email: email });
    await ErrorUtils.validationError(validation);

    return await UserRepository.getUserInformation(email);
  }
}
