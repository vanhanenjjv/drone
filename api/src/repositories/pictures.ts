import { Analytic, Picture } from '../entities';
import pool from './pool';


export async function all(): Promise<Picture[]> {
  const result = await pool.query(`
    SELECT
      "id"
    FROM 
      "picture"
  `);

  return result.rows;
}

export async function single(id: number): Promise<Picture | undefined> {
  const result = await pool.query(
    `
      SELECT
        "id"
      FROM 
        "picture"
      WHERE
        "id" = $1
    `,
    [id]
  );

  if (result.rowCount === 0)
    return undefined;

  if (result.rowCount !== 1)
    throw new Error('More rows were read than was expected.');

  const row = result.rows[0];

  return {
    id: row['id']
  };
}

export async function analyticOf(id: number): Promise<Analytic | undefined> {
  const result = await pool.query(
    `
      SELECT 
        "analytic"."id",
        "analytic"."name",
        "analytic"."description"
        "analytic"."location"
        "analytic"."timestamp"
      FROM 
        "picture_analytic"
      INNER JOIN 
        "picture" ON "picture_analytic"."picture" = "picture"."id"
      INNER JOIN 
        "analytic" ON "picture_analytic"."analytic" = "analytic"."id"
      WHERE
        "picture"."id" = $1
    `,
    [id]
  );

  if (result.rowCount === 0)
    return undefined;

  const row = result.rows[0];

  return {
    id: row['id'],
    name: row['name'],
    description: row['description'],
    location: { longitude: row['location']['x'], latitude: row['location']['y'] },
    timestamp: new Date(row['timestamp'])
  };
}
