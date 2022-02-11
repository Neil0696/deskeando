import React from "react";
import { formatBookingDate } from "../util";
import ModalBookingScreen from "./ModalBookingScreen";
import ModalCancelBookingScreen from "./ModalCancelBookingScreen";
import "./WeeklyTable.css";
import { Button } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";

const getBookingsByRow = (bookings, week) => {
	const bookingsByDayWithNoDesk = {};
	week.forEach((day) => {
		bookingsByDayWithNoDesk[day] = bookings.filter(
			(booking) => booking.date === day && booking.desk === null
		);
	});

	const rowsCount = Math.max(
		...Object.values(bookingsByDayWithNoDesk).map(
			(bookingsForDay) => bookingsForDay.length
		)
	);

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

	return { bookingsByDesk, bookingsByDayWithDesk };
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
	refreshBooking,
	maxDesksForDay,
	users,
	week,
}) => {
	const startOfTheWeekDate = moment().startOf("isoWeek").toDate();
	const [currentMonday, setCurrentMonday] = useState(startOfTheWeekDate);

	let week = [];
	const year = currentMonday.getFullYear();
	const month = currentMonday.getMonth();
	let date = currentMonday.getDate();

	for (let i = 0; i < 5; i++) {
		week.push(new Date(year, month, date + i).toISOString());
	}

	const bookingsByRow = getBookingsByRow(bookings, week);
	const { bookingsByDesk, bookingsByDayWithDesk } = getBookingsByDesk(
		bookings,
		week,
		desks
	);

	function setThisMonday() {
		setCurrentMonday(startOfTheWeekDate);
	}

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
		<div id="table" className="table-container">
		<div className="arrow">
				<Button className={"arrows"} icon onClick={setPreviousMonday}>
					<Icon name="angle left" size="big" />
				</Button>
				<button className={"inner"} onClick={setThisMonday}>
					This week
				</button>
				<Button className={"arrows"} icon onClick={setPreviousMonday}>
					<Icon name="angle right" size="big" />
				</Button>
			</div>
			<table id="table" className="table">
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
									users={users}
									bookingsForDate={bookingsByDayWithDesk[date]}
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
								<td key={index} className="visible-on-hover">
									{booking?.name}
									{booking?.name && (
										<span className="hide">
											<ModalCancelBookingScreen
												booking={booking}
												refreshBooking={refreshBooking}
											/>
										</span>
									)}
								</td>
							))}
						</tr>
					))}
					{desks.map((desk) => (
						<tr key={desk.name}>
							<td className="desk-column">{desk.name}</td>
							{bookingsByDesk[desk.name].map((booking, index) => (
								<td key={index} className="visible-on-hover">
									{booking?.name}
									{booking?.name && (
										<span className="hide">
											<ModalCancelBookingScreen
												booking={booking}
												refreshBooking={refreshBooking}
											/>
										</span>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WeeklyTable;
