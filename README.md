# Drone

## Requirements

- Docker

## Running

1. Configure database connection

    Paste the following configuration into `./database.env`:

        POSTGRES_HOST=db
        POSTGRES_DATABASE=drone
        POSTGRES_USER=drone
        POSTGRES_PASSWORD=dr0ne

2. Start services

    Run:
    ```sh
    docker-compose up
    ```

    Keep in mind that the database initialization might take a while and cause the node.js process to hang. That is expected and it should restart on it's own.

3. Test

    Opening http://localhost:5000/users in browser should return an array of users. There should already be one existing user.


## Endpoints

| Action      | Method | Endpoint                        | Parameters                               |
| ----------- | ------ | ------------------------------- | ---------------------------------------- |
| Show users  | GET    | http://localhost:5000/users     |                                          |
| Show user   | GET    | http://localhost:5000/users/:id |                                          |
| Add user    | POST   | http://localhost:5000/users     | { "name": string, "username": string }   |
| Modify user | PUT    | http://localhost:5000/users/:id | { "name": string?, "username": string? } |
| Delete user | DELETE | http://localhost:5000/users/:id |                                          |

You can find examples of usage in [./api/http/users.http](./api/http/users.http).