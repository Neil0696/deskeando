import React from "react";
import { useState } from "react";

import { formatBookingDate } from "../util";
import ModalBookingScreen from "./ModalBookingScreen";

import "./WeeklyTable.css";
// const DEFAULT_MONDAY = new Date(2022, 0, 17);

const week = [
	"2022-01-17T00:00:00.000Z",
	"2022-01-18T00:00:00.000Z",
	"2022-01-19T00:00:00.000Z",
	"2022-01-20T00:00:00.000Z",
	"2022-01-21T00:00:00.000Z",
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

const getBookingsByDesk = (bookings, week, desks) => {
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

const getAvailableDesksForDay = (bookings, date, maxDesksForDay) => {
	const countBookingsByDay = bookings.filter(
		(booking) => booking.date === date
	).length;

	const availableDesks = maxDesksForDay - countBookingsByDay;

	if (availableDesks === 0) {
		return "No desks available";
	} else {
		return availableDesks + "/" + maxDesksForDay + " desks available";
	}
};

const WeeklyTable = ({
	bookings,
	desks,
	rowsCount,
	refreshBooking,
	maxDesksForDay,
}) => {
	const [currentMonday, setCurrentMonday] = useState(new Date(2022, 0, 17));
	let week = [];
	const year = currentMonday.getFullYear();
	const month = currentMonday.getMonth();
	let date = currentMonday.getDate();

	const bookingsByDesk = getBookingsByDesk(bookings, week, desks);
	for (let i = 0; i < 5; i++) {
		// this will even work if we cross over into the next month!!
		week.push(new Date(year, month, date + i).toISOString());
	}
	console.log(week);
	const bookingsByRow = getBookingsByRow(bookings, rowsCount, week);
	console.log(bookingsByRow);
	const bookingsByDesk = getBookingsByDesk(bookings, week);
	// function setThisMonday() {

	// }
	function setNextMonday() {
		setCurrentMonday((currentMonday) => {
			return new Date(
				currentMonday.getFullYear(),
				currentMonday.getMonth(),
				currentMonday.getDate() + 7
			);
		});
	}
	function setPreviousMonday() {
		setCurrentMonday((currentMonday) => {
			return new Date(
				currentMonday.getFullYear(),
				currentMonday.getMonth(),
				currentMonday.getDate() - 7
			);
		});
	}

	return (
		<div>
			<div>
				{/* <tr> */}
				<span>This Week</span>
				<button className={"inner"} onClick={setPreviousMonday}>
					Previous week
				</button>
				<button className={"inner"} onClick={setNextMonday}>
					Next Week
				</button>
				{/* </tr> */}
			</div>
			<table>
				<thead>
					<tr>
						<th></th>
						{week.map((date) => (
							<th key={date}>
								{formatBookingDate(date)}
								<ModalBookingScreen
									bookingDate={date}
									refreshBooking={refreshBooking}
									desks={desks}
								/>
								<br />
								{getAvailableDesksForDay(bookings, date, maxDesksForDay)}
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
