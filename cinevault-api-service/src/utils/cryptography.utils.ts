import bcrypt from 'bcrypt';

export class CryptographyUtils {
  /**
   * Função para criptografar uma senha
   * @param password Em qual linha será a alteração
   * @returns Senha encriptada
   */
  static async encryptPassword(password: string): Promise<string> {
    const salt: string = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Função para comparar senha e hash de uma senha
   * @param password senha não criptograda
   * @param hashPassword senha criptograda para comparação
   * @returns true em caso de senha compativel, false em caso de senha incorreta
   */
  static async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
