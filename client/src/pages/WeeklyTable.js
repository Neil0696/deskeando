import React from "react";

import { formatBookingDate } from "../util";
import ModalBookingScreen from "./ModalBookingScreen";

import "./WeeklyTable.css";

const week = [
	"2022-01-17T00:00:00.000Z",
	"2022-01-18T00:00:00.000Z",
	"2022-01-19T00:00:00.000Z",
	"2022-01-20T00:00:00.000Z",
	"2022-01-21T00:00:00.000Z",
];
const desks = [
	{ id: 1, name: "desk 1" },
	{ id: 2, name: "desk 2" },
	{ id: 3, name: "desk 3" },
	{ id: 4, name: "desk 4" },
	{ id: 5, name: "desk 5" },
	{ id: 6, name: "desk 6" },
];

const getBookingsByRow = (bookings, rowsCount, week) => {
	const bookingsByDayWithNoDesk = {};
	week.forEach((day) => {
		bookingsByDayWithNoDesk[day] = bookings.filter(
			(booking) => booking.date === day && booking.desk === null
		);
	});

	const bookingsByRow = [];
	for (let i = 0; i < rowsCount; i++) {
		bookingsByRow[i] = week.map((day) => bookingsByDayWithNoDesk[day][i]);
	}
	return bookingsByRow;
};

const getBookingsByDesk = (bookings, week) => {
	const bookingsByDayWithDesk = {};
	week.forEach((day) => {
		bookingsByDayWithDesk[day] = bookings.filter(
			(booking) => booking.date === day && booking.desk !== null
		);
	});

	const bookingsByDesk = {};
	desks.forEach((desk) => {
		bookingsByDesk[desk.name] = week.map((day) =>
			bookingsByDayWithDesk[day].find((booking) => booking.desk === desk.name)
		);
	});

	return bookingsByDesk;
};

const countAvailableDesksForDay = (bookings, date, maxDesksForDay) => {
	
	const countBookingsByDay = bookings.filter(
		(booking) => booking.date === date
	).length;

	const availableDesks = maxDesksForDay - countBookingsByDay;

	if (countBookingsByDay >= 0 && countBookingsByDay < maxDesksForDay) {
		return availableDesks + "/" + maxDesksForDay + " desks available";
	} else if (countBookingsByDay === maxDesksForDay) {
		return "No desks available";
	}
};

const WeeklyTable = ({
	bookings,
	rowsCount,
	refreshBooking,
	maxDesksForDay,
}) => {
	const bookingsByRow = getBookingsByRow(bookings, rowsCount, week);
	console.log({ bookingsByRow });

	const bookingsByDesk = getBookingsByDesk(bookings, week);
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th></th>
						{week.map((date) => (
							<th key={date}>
								{formatBookingDate(date)}{" "}
								<ModalBookingScreen
									bookingDate={date}
									refreshBooking={refreshBooking}
								/>
								<br />
								{countAvailableDesksForDay(bookings, date, maxDesksForDay)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{bookingsByRow.map((row, i) => (
						<tr key={i}>
							<td></td>
							{row.map((booking, index) => (
								<td key={index}>{booking?.name}</td>
							))}
						</tr>
					))}
					{desks.map((desk) => (
						<tr key={desk.name}>
							<td>{desk.name}</td>
							{bookingsByDesk[desk.name].map((booking, index) => (
								<td key={index}>{booking?.name}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WeeklyTable;
