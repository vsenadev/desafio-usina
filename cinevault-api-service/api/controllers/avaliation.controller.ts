import { AvaliationService } from '@/services/avaliation.service';
import { IAvaliation } from '@/models/avaliation.model';
import { Request, Response } from 'express';
import { ErrorUtils } from '@/utils/error.utils';
import { UserService } from '@/services/user.service';
import { IUserUpdate } from '@/models/user.model';

export class AvaliationController {
  static async createAvaliation(req: Request, res: Response) {
    try {
      res
        .status(201)
        .json(
          await AvaliationService.createAvaliation(req.body as IAvaliation),
        );
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async updateAvaliation(req: Request | any, res: Response) {
    try {
      res
        .status(201)
        .json(
          await AvaliationService.updateAvaliation(
            parseInt(req.params.id),
            req.body as IAvaliation,
          ),
        );
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async deleteAvaliation(req: Request | any, res: Response) {
    try {
      res
        .status(201)
        .json(
          await AvaliationService.deleteAvaliation(parseInt(req.params.id)),
        );
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }
}
