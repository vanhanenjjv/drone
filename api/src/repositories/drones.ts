import pool from './pool';
import { Drone, User } from '../entities';


export async function all(): Promise<Drone[]> {
  const result = await pool.query('SELECT * FROM drones;');

  return result.rows;
}

export async function single(id: number): Promise<Drone | undefined> {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        brand,
        model,
        additional
      FROM 
        drones
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
    id:         row['id'],
    name:       row['name'],
    brand:      row['brand'],
    model:      row['model'],
    additional: row['additional']
  };
}

export async function isAvailable(id: number): Promise<boolean> {
  const result = await pool.query(
    `
      SELECT
      FROM 
        drone_users
      WHERE
        drone = $1;
    `,
    [id]
  );

  return result.rowCount == 0;
}

export async function userOf(id: number): Promise<Partial<User> | undefined> {
  const result = await pool.query(
    `
      SELECT
        users.id AS "user_id",
        users.name AS "user_name",
        users.username AS "user_username"
      FROM 
        drone_users
      INNER JOIN
        users ON drone_users.user = users.id
      WHERE
        drone = $1;
    `,
    [id]
  );

  if (result.rowCount === 0)
    return undefined;

  const row = result.rows[0];

  return {
    id:       row['user_id'],
    name:     row['user_name'],
    username: row['user_username']
  };
}

