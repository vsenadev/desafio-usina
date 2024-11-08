import { Request, Response, NextFunction } from 'express';
import { authService } from '@/services/auth.service';

export function authMiddleware(
  req: Request | any,
  res: Response,
  next: NextFunction,
): any {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const decoded = authService.validateToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }

  req.user = decoded;

  next();
}
