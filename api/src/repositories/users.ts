import { User } from '../entities';
import pool from './pool';


export async function all(): Promise<User[]> {
  const result = await pool.query('SELECT * FROM user');

  return result.rows;
}

export async function single(id: number): Promise<User | undefined> {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        username,
        password,
        token
      FROM 
        "user"
      WHERE
        id = $1;
    `,
    [id]
  );

  if (result.rowCount === 0)
    return undefined;

  if (result.rowCount !== 1)
    throw new Error('More rows than was expected.');

  const row = result.rows[0];

  return {
    id:       row['id'],
    name:     row['name'],
    username: row['username'],
    password: row['password'],
    token:    row['token']
  };
}
