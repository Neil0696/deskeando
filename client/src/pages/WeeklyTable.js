import React from "react";
import moment from 'moment';
import ModalBookingScreen from "./ModalBookingScreen";

import "./WeeklyTable.css";

const week = [
	"2022-01-17T00:00:00.000Z",
	"2022-01-18T00:00:00.000Z",
	"2022-01-19T00:00:00.000Z",
	"2022-01-20T00:00:00.000Z",
	"2022-01-21T00:00:00.000Z",
];

const getBookingsByRow = (bookings, rowsCount, week) => {
	const bookingsByDay = {};
	week.forEach((day) => {
		bookingsByDay[day] = bookings.filter((booking) => booking.date === day);
	});

	const bookingsByRow = [];
	for (let i = 0; i < rowsCount; i++) {
		bookingsByRow[i] = week.map((day) => bookingsByDay[day][i]);
	}
	return bookingsByRow;
};

const WeeklyTable = ({ bookings, rowsCount }) => {
	const bookingsByRow = getBookingsByRow(bookings, rowsCount, week);

	return (
		<div>
			<table>
				<thead>
					<tr>
						{week.map((date) => (
							<th key={date}>
								{moment(date).format("ddd MMM Do")}{" "}
								<ModalBookingScreen
									bookingDate={moment(date).format("ddd MMM Do")}
								/>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{bookingsByRow.map((row, i) => (
						<tr key={i}>
							{row.map((booking, index) => (
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
