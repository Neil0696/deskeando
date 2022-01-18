drop table if exists booking;
drop table if exists desk_user;
create table desk_user (id SERIAL PRIMARY KEY, username VARCHAR(200) not null);
create table booking (
    id SERIAL PRIMARY KEY,
    desk_user_id INT REFERENCES desk_user(id),
    booking_date DATE
);
INSERT INTO desk_user (id, username) VALUES (1, 'Maha'); 
INSERT INTO desk_user (id, username) VALUES (2, 'Sam'); 
INSERT INTO desk_user (id, username) VALUES (3, 'Pablo'); 
INSERT INTO booking (id, desk_user_id, booking_date) VALUES (1, 1, '2022-01-17'); 
INSERT INTO booking (id, desk_user_id, booking_date) VALUES (2, 2, '2022-01-19');
INSERT INTO booking (id, desk_user_id, booking_date) VALUES (3, 1, '2022-01-19');
INSERT INTO booking (id, desk_user_id, booking_date) VALUES (4, 3, '2022-01-19');
INSERT INTO booking (id, desk_user_id, booking_date) VALUES (5, 3, '2022-01-20');
INSERT INTO booking (id, desk_user_id, booking_date) VALUES (6, 1, '2022-01-20');
INSERT INTO booking (id, desk_user_id, booking_date) VALUES (7, 1, '2022-01-21');
