import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

/**
 * Função para executar consultas no banco de dados
 * @param query A consulta SQL a ser executada
 * @param values Os valores dos parâmetros para a consulta
 * @returns O resultado da consulta
 */
export const executeQuery = async (
  query: string,
  values: any[] = [],
): Promise<any> => {
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error: any) {
    if (error.code === '23505') {
      const detail = error.detail || '';
      const duplicatedFieldMatch = detail.match(/\(([^)]+)\)=\(([^)]+)\)/);

      let message: string = 'Erro de duplicidade: valor já existente';
      if (duplicatedFieldMatch) {
        const [, field, value] = duplicatedFieldMatch;
        message = `Erro de duplicidade: o campo '${field}' com o valor '${value}' já existe.`;
      }

      throw new Error(message);
    }

    throw new Error(
      error.message || 'Erro ao executar a consulta no banco de dados.',
    );
  }
};

/**
 * Função para gerar parametros e valores de update no banco de dados
 * @param id Em qual linha será a alteração
 * @param data Os valores a serem alterados
 * @returns Os valores de keys e values
 */
export function mountSqlUpdateKeysAndValues(id: number | string, data: object) {
  const validEntries = Object.entries(data).filter(
    ([_, value]) => value !== undefined,
  );

  const keys = validEntries.map(([key]) => key);
  const values = validEntries.map(([_, value]) => value);

  const queryParams = [id, ...values];

  const setQuery = keys
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ');

  return { setQuery, queryParams };
}
