import { Request, Response } from 'express';
import { UserService } from '@/services/user.service';
import { ILogin, IUser, IUserUpdate } from '@/models/user.model';
import { ErrorUtils } from '@/utils/error.utils';

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      res.status(201).json(await UserService.createUser(req.body as IUser));
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      res.status(200).json(await UserService.login(req.body as ILogin));
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async updateUser(req: Request | any, res: Response) {
    try {
      res
        .status(201)
        .json(
          await UserService.updateUser(req.user.email, req.body as IUserUpdate),
        );
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async deleteUser(req: Request | any, res: Response) {
    try {
      res.status(200).json(await UserService.deleteUser(req.user.email));
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }

  static async getUserInformation(req: Request | any, res: Response) {
    try {
      res
        .status(200)
        .json(await UserService.getUserInformation(req.user.email));
    } catch (error) {
      await ErrorUtils.controllerError(error, res);
    }
  }
}
