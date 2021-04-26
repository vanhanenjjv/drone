import { Analytic, Picture } from '../entities';
import pool from './pool';


export async function all(): Promise<Picture[]> {
  const result = await pool.query('SELECT * FROM pictures;');

  return result.rows;
}

export async function single(id: number): Promise<Picture | undefined> {
  const result = await pool.query(
    `
      SELECT
        id
      FROM 
        pictures
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
    id: row['id']
  };
}

export async function analyticOf(id: number): Promise<Analytic | undefined> {
  const result = await pool.query(
    `
      SELECT 
        analytics.id AS id,
        analytics.name AS name,
        analytics.description AS description,
        analytics.location AS location,
        analytics.timestamp AS timestamp
      FROM 
        picture_analytics
      INNER JOIN 
        pictures ON picture_analytics.picture = pictures.id
      INNER JOIN 
        analytics ON picture_analytics.analytic = analytics.id
      WHERE
        pictures.id = $1;
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
