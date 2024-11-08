import { SafeParseReturnType } from 'zod';

export class ErrorUtils {
  /**
   * Função para formatar mensagem de erro na validação dos dados
   * @param validation Objeto com valores validados
   * @returns Mensagem de erro formatada
   */
  static async validationError(validation: SafeParseReturnType<any, any>) {
    if (!validation.success) {
      throw new Error(
        `Erro de validação: ${validation.error.issues.map((issue) => `${issue.path.join('.')} - ${issue.message}`).join(', ')}`,
      );
    }
  }

  static async controllerError(error: unknown, res: Response | any) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Erro desconhecido. Contate o suporte.';
    const statusCode = errorMessage.includes('duplicidade') ? 409 : 400;
    res.status(statusCode).json({ error: errorMessage });
  }
}
