CREATE TABLE Drone (
    id                            integer                       NOT NULL UNIQUE PRIMARY KEY,
    name                          text                          NOT NULL,
    brand                         text                          NOT NULL,
    model                         text                          NOT NULL,
    additional                    text
);

CREATE TABLE Account (
    name                          text                          NOT NULL,
    username                      text                          NOT NULL UNIQUE PRIMARY KEY,
    password                      text                          NOT NULL,
    token                         text                          NOT NULL
);

CREATE TABLE Picture (
    id                            integer                       NOT NULL UNIQUE PRIMARY KEY,
    name                          text                          NOT NULL,
    description                   text                          NOT NULL,
    location                      point                         NOT NULL,
    timestamp                     timestamp                     NOT NULL
);
