INSERT INTO "drone" ("name"     ,    "brand"  ,    "model",    "additional") 
VALUES              ('Lentsikka',    'Winnair',    'V3'   ,    NULL        ),
                    ('Kopteri'  ,    'Winnair',    'Pro'  ,    NULL        );

INSERT INTO "user" ("name"             ,    "username",    "password",    "token"    )
VALUES             ('Matti Meikäläinen',    'matti420',    'kissa321',    'k2o3k1o02');

INSERT INTO "analytic" ("name"   ,    "description"      ,    "location"   ,    "timestamp"          )
VALUES                 ('picture',    'this is a picture',    '(4.43,5.49)',    '2021-04-25T15:38:21');

INSERT INTO "picture"
DEFAULT VALUES;

INSERT INTO "picture_analytic" ("picture",    "analytic")
VALUES                         (1        ,    1         ); 

INSERT INTO "drone_user" ("drone",    "user")
VALUES                   (1      ,    1     );

INSERT INTO "drone_picture" ("drone",    "picture",    "user")
VALUES                      (1      ,    1        ,    1     );
