INSERT INTO "drone" ("name"     ,    "brand"  ,    "model",    "additional") 
VALUES              ('Lentsikka',    'Winnair',    'V3'   ,    NULL        ),
                    ('Kopteri'  ,    'Winnair',    'Pro'  ,    NULL        );

INSERT INTO "user" ("name"             ,    "username")
VALUES             ('Matti Meikäläinen',    'matti420');

INSERT INTO "analytics" ("name"   ,    "description"      ,    "location"   ,    "timestamp"          )
VALUES                  ('picture',    'this is a picture',    '(4.43,5.49)',    '2021-04-25T15:38:21');

INSERT INTO "picture"
DEFAULT VALUES;

INSERT INTO "picture_analytics" ("picture",    "analytics")
VALUES                          (1        ,    1         ); 

INSERT INTO "drone_user" ("drone",    "user")
VALUES                   (1      ,    1     );

INSERT INTO "drone_picture" ("drone",    "picture",    "user")
VALUES                      (1      ,    1        ,    1     );
