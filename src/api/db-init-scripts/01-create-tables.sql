CREATE TABLE drones (
    "id"                          INT                           UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "name"                        TEXT                          NOT NULL,
    "brand"                       TEXT                          NOT NULL,
    "model"                       TEXT                          NOT NULL,
    "additional"                  TEXT
);

CREATE TABLE users (
    "id"                          INT                           UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "name"                        TEXT                          NOT NULL,
    "username"                    TEXT                          NOT NULL UNIQUE,
    "password"                    TEXT                          NOT NULL,
    "token"                       TEXT                          NOT NULL
);

CREATE TABLE pictures (
    "id"                          INT                           UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "name"                        TEXT                          NOT NULL,
    "description"                 TEXT                          NOT NULL,
    "location"                    POINT                         NOT NULL,
    "timestamp"                   TIMESTAMP                     NOT NULL
);

CREATE TABLE drone_users (
    "drone"                       INT                           REFERENCES drones ("id"),
    "user"                        INT                           REFERENCES users ("id"),

    PRIMARY KEY ("drone", "user")
);
