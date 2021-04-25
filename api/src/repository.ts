import { Pool } from 'pg';
import { Drone, Picture, Session, User } from './entities';


const pool = new Pool({
  host:     process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user:     process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

pool.connect().catch(reason => {
  console.error(reason);
  process.exit(1);
});

export async function drones(): Promise<Drone[]> {
  const result = await pool.query('SELECT * FROM drone');

  return result.rows;
}

export async function users(): Promise<User[]> {
  const result = await pool.query('SELECT * FROM user');

  return result.rows;
}

export async function singleDrone(id: number): Promise<Drone | undefined> {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        brand,
        model,
        additional
      FROM 
        drone
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

export async function singleUser(id: number): Promise<User | undefined> {
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


export async function whoUsesDrone(id: number): Promise<Partial<User> | undefined> {
  const result = await pool.query(
    `
      SELECT
        "user".id AS "user_id",
        "user".name AS "user_name",
        "user".username AS "user_username"
      FROM 
        drone_user
      INNER JOIN
        "user" ON drone_user."user" = "user".id
      WHERE
        drone = $1;
    `,
    [id]
  );

  if (result.rowCount == 0)
    return undefined;

  const row = result.rows[0];

  return {
    id:       row['user_id'],
    name:     row['user_name'],
    username: row['user_username']
  };
}

export async function isDroneAvailable(id: number): Promise<boolean> {
  const result = await pool.query(
    `
      SELECT
      FROM 
        drone_user
      WHERE
        drone = $1;
    `,
    [id]
  );

  return result.rowCount == 0;
}

export async function droneUser(): Promise<Session[]> {
  const result = await pool.query(`
    SELECT 
      drone.name AS "drone_name",
      drone.brand AS "drone_brand",
      drone.model AS "drone_model",
      drone.additional AS "drone_additional",
      "user".name AS "user_name",
      "user".username AS "user_username"
    FROM 
      drone_user
    INNER JOIN 
      "drone" ON drone_user.drone = drone.id
    INNER JOIN 
      "user" ON drone_user."user" = "user".id;
  `);

  return result.rows.map(r => ({
    drone: {
      name:       r['drone_name'],
      brand:      r['drone_brand'],
      model:      r['drone_model'],
      additional: r['drone_additional']
    },
    user: {
      name:     r['user_name'],
      username: r['user_username']
    }
  }));
}

export async function pictures(): Promise<Picture[]> {
  const result = await pool.query('SELECT * FROM picture');

  return result.rows;
}
