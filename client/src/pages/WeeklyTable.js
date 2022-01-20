import React from "react";

import TableHeading from "./TableHeading";

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
			<TableHeading />
			<tbody>
				<tr>{fillInRow(1, props.result)}</tr>
				<tr>{fillInRow(2, props.result)}</tr>
				<tr>{fillInRow(3, props.result)}</tr>
			</tbody>
		</table>
	</div>
);

export default WeeklyTable;
