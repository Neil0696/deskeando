INSERT INTO desk_user (username) VALUES ('Maha'); 
INSERT INTO desk_user (username) VALUES ('Sam'); 
INSERT INTO desk_user (username) VALUES ('Pablo');
INSERT INTO desk_user (username) VALUES ('Adeola');
INSERT INTO desk_user (username) VALUES ('Megumi'); 
INSERT INTO desk_user (username) VALUES ('Serena');
INSERT INTO desk_user (username) VALUES ('Ali');

INSERT INTO desk (desk_name,x,y,r) VALUES ('desk 1',0,0,0);
INSERT INTO desk (desk_name,x,y,r) VALUES ('desk 2',175,0,180);
INSERT INTO desk (desk_name,x,y,r) VALUES ('desk 3',0,170,0);
INSERT INTO desk (desk_name,x,y,r) VALUES ('desk 4',175,170,180);
INSERT INTO desk (desk_name,x,y,r) VALUES ('desk 5',0,340,0);
INSERT INTO desk (desk_name,x,y,r) VALUES ('desk 6',175,340,180);


INSERT INTO booking (desk_user_id, booking_date) VALUES (1,'2022-01-17'); 
INSERT INTO booking (desk_user_id, booking_date) VALUES (2,'2022-01-19');
INSERT INTO booking (desk_user_id, booking_date) VALUES (1,'2022-01-19');
INSERT INTO booking (desk_user_id, booking_date) VALUES (3,'2022-01-19');
INSERT INTO booking (desk_user_id, booking_date) VALUES (3,'2022-01-20');
INSERT INTO booking (desk_user_id, booking_date) VALUES (1,'2022-01-20');
INSERT INTO booking (desk_user_id, booking_date) VALUES (1,'2022-01-21');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (4,1,'2022-01-20');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (5,3,'2022-01-18');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (5,3,'2022-01-20');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (5,3,'2022-01-21');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (6,4,'2022-01-19');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (6,5,'2022-01-20');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (7,6,'2022-01-19');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (7,6,'2022-01-21');
INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES (3,4,'2022-01-21');