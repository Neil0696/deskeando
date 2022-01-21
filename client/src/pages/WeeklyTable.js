import React from "react";


const fillInRow = (seat, bookings) =>
	bookings
		.filter((booking) => booking.desk_user_id === seat)
		.map((b, index) => (
			<td key={index}>
				{b.username}
			</td>
		));

const WeeklyTable = (props) => (
	<div>
		<table>
			<thead>
				<tr>
					<th scope="col">Monday Jan 17th</th>
					<th scope="col">Tue Jan 18th</th>
					<th scope="col">Wed Jan 19th</th>
					<th scope="col">Thu Jan 20th</th>
					<th scope="col">Fri Jan 21st</th>
				</tr>
			</thead>
			<tbody>
				<tr>{fillInRow(1, props.bookings)}</tr>
				<tr>{fillInRow(2, props.bookings)}</tr>
				<tr>{fillInRow(3, props.bookings)}</tr>
			</tbody>
		</table>
	</div>
);

export default WeeklyTable;
