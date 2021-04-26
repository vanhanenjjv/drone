INSERT INTO drones (name       ,    brand    ,    model,    additional) 
VALUES             ('Lentsikka',    'Winnair',    'V3' ,    NULL      ),
                   ('Kopteri'  ,    'Winnair',    'Pro',    NULL      );

INSERT INTO users (name               ,    username  )
VALUES            ('Matti Meikäläinen',    'matti420');

INSERT INTO analytics (name     ,    description        ,    location     ,    timestamp            )
VALUES                ('picture',    'this is a picture',    '(4.43,5.49)',    '2021-04-25T15:38:21');

INSERT INTO pictures
DEFAULT VALUES;

INSERT INTO picture_analytics (picture,    analytic)
VALUES                        (1      ,    1       ); 

INSERT INTO drone_users (drone,    "user")
VALUES                  (1    ,    1     );

INSERT INTO drone_pictures (drone,    picture,    "user")
VALUES                     (1    ,    1      ,    1     );
