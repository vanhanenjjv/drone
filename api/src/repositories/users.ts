import { User } from '../entities';
import { UserInsertModel } from '../models';
import pool from './pool';


export async function all(): Promise<User[]> {
  const result = await pool.query('SELECT * FROM "user"');

  return result.rows;
}

export async function single(id: number): Promise<User | undefined> {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        username
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
    username: row['username']
  };
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const result = await pool.query(
    `
      SELECT
      FROM
        "user"
      WHERE
        username = $1;
    `,
    [username]
  );

  return result.rowCount === 0;
}

export async function insert(user: UserInsertModel): Promise<void> {
  const result = await pool.query(
    `
      INSERT INTO "user" ("name",    "username")
      VALUES             ($1    ,    $2        );
    `,
    [user.name, user.username]
  );
}

export async function update(user: User): Promise<void> {
  await pool.query(
    `
      UPDATE 
        "user"
      SET
        "name" = $1,
        "username" = $2
      WHERE
        id = $3
    `,
    [user.name, user.username, user.id]
  );
}

export async function remove(id: number): Promise<void> {
  await pool.query(
    `
      DELETE 
      FROM
        "user"
      WHERE
        id = $1;
    `,
    [id]
  );
}

export async function exists(id: number): Promise<boolean> {
  const result = await pool.query(
    `
      SELECT
      FROM
        "user"
      WHERE
        id = $1;
    `,
    [id]
  );

  return result.rowCount === 1;
}
