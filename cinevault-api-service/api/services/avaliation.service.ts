import { IAvaliation } from '@/models/avaliation.model';
import { IMessage } from '@/models/message.model';
import {
  avaliationSchema,
  updateAvaliationSchema,
} from '@/schemas/avaliation.schema';
import { ErrorUtils } from '@/utils/error.utils';
import { AvaliationRepository } from '@/repositories/avaliation.repository';
import { mountSqlUpdateKeysAndValues } from '@/database/database';

export class AvaliationService {
  static async createAvaliation(data: IAvaliation): Promise<IMessage> {
    const validation = avaliationSchema.safeParse(data);
    await ErrorUtils.validationError(validation);

    return await AvaliationRepository.createAvaliation(data);
  }

  static async updateAvaliation(
    id: number,
    data: IAvaliation,
  ): Promise<IMessage> {
    const validation = updateAvaliationSchema.safeParse(data);
    await ErrorUtils.validationError(validation);

    const { setQuery, queryParams } = mountSqlUpdateKeysAndValues(id, data);

    return await AvaliationRepository.updateAvaliation(setQuery, queryParams);
  }

  static async deleteAvaliation(id: number): Promise<IMessage> {
    const validation = updateAvaliationSchema.safeParse({ id: id });
    await ErrorUtils.validationError(validation);

    return await AvaliationRepository.deleteAvaliation(id);
  }
}
