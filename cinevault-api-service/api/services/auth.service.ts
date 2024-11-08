import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'fallback_secret_key';
const EXPIRES_IN = process.env.EXPIRES_IN;

export class AuthService {
  generateToken(payload: object): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  }

  validateToken(token: string): JwtPayload | string | null {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();
