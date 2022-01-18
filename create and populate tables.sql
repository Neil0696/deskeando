drop table user;
drop table bookings;
create table user (userId SERIAL PRIMARY KEY, username VARCHAR(200) not null);
create table bookings (
    bookingId SERIAL PRIMARY KEY,
    userName VARCHAR(200),
    bookingDate DATE
);
INSERT INTO user (userId, username) VALUES (1, 'Maha'); 
INSERT INTO user (userId, username) VALUES (2, 'Sam'); 
INSERT INTO user (userId, username) VALUES (3, 'Pablo'); 
INSERT INTO bookings (bookingId, userName, bookingDate) VALUES (1, 'Maha', '2022-01-17'); 
INSERT INTO bookings (bookingId, userName, bookingDate) VALUES (2, 'Sam', '2022-01-19');
INSERT INTO bookings (bookingId, userName, bookingDate) VALUES (3, 'Maha', '2022-01-19');
INSERT INTO bookings (bookingId, userName, bookingDate) VALUES (4, 'Pablo', '2022-01-19');
INSERT INTO bookings (bookingId, userName, bookingDate) VALUES (5, 'Pablo', '2022-01-20');
INSERT INTO bookings (bookingId, userName, bookingDate) VALUES (6, 'Maha', '2022-01-20');
INSERT INTO bookings (bookingId, userName, bookingDate) VALUES (7, 'Maha', '2022-01-21');
