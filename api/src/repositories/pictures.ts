import { Analytics, Picture } from '../entities';
import pool from './pool';


export async function all(): Promise<Picture[]> {
  const result = await pool.query('SELECT * FROM picture');

  return result.rows;
}

export async function single(id: number): Promise<Picture | undefined> {
  const result = await pool.query(
    `
      SELECT
        id
      FROM 
        picture
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

export async function analyticsOf(id: number): Promise<Analytics | undefined> {
  const result = await pool.query(
    `
      SELECT 
        analytics.id AS "id",
        analytics.name AS "name",
        analytics.description AS "description",
        analytics.location AS "location",
        analytics.timestamp AS "timestamp"
      FROM 
        picture_analytics
      INNER JOIN 
        "picture" ON picture_analytics.picture = picture.id
      INNER JOIN 
        "analytics" ON picture_analytics.analytics = analytics.id
      WHERE
        picture.id = $1;
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
