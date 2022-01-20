drop table if exists booking;
drop table if exists desk_user;
create table desk_user (id SERIAL PRIMARY KEY, username VARCHAR(200) not null);
create table booking (
    id SERIAL PRIMARY KEY,
    desk_user_id INT REFERENCES desk_user(id),
    booking_date DATE
);
INSERT INTO desk_user (username) VALUES ('Maha'); 
INSERT INTO desk_user (username) VALUES ('Sam'); 
INSERT INTO desk_user (username) VALUES ('Pablo'); 
INSERT INTO booking (desk_user_id, booking_date) VALUES (1, '2022-01-17'); 
INSERT INTO booking (desk_user_id, booking_date) VALUES (2, '2022-01-19');
INSERT INTO booking (desk_user_id, booking_date) VALUES (1, '2022-01-19');
INSERT INTO booking (desk_user_id, booking_date) VALUES (3, '2022-01-19');
INSERT INTO booking (desk_user_id, booking_date) VALUES (3, '2022-01-20');
INSERT INTO booking (desk_user_id, booking_date) VALUES (1, '2022-01-20');
INSERT INTO booking (desk_user_id, booking_date) VALUES (1, '2022-01-21');
