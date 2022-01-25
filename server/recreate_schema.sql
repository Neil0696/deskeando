drop table if exists booking;
drop table if exists desk;
drop table if exists desk_user;
create table desk_user (id SERIAL PRIMARY KEY, username VARCHAR(200) not null);
create table desk (
    id SERIAL PRIMARY KEY,
    desk_name VARCHAR (100) not null);
create table booking (
    id SERIAL PRIMARY KEY,
    desk_user_id INT REFERENCES desk_user(id),
    desk_id INT REFERENCES desk(id)
    desk_table_name INT REFERENCES desk(desk_name),
    booking_date DATE
);


