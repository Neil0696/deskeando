import React from "react";
import data from "../Data/bookings.json";
import "./WeeklyTable.css";


function WeeklyTable  () {
		return (
			<table className="content-table">
				<thead>
					<tr>
						<th>Mon Jan 17th</th>
						<th>Tue Jan 18th</th>
						<th>Wed Jan 19th</th>
						<th>Thu Jan 20th</th>
						<th>Fri Jan 21th</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
						<td>{data[0].username}</td>
						<td>{data[1].username}</td>
						<td>{data[3].username}</td>
						<td>{data[3].username}</td>
					</tr>
					<tr>
						<td></td>
						<td>{data[0].username}</td>
						<td></td>
						<td></td>
						<td>{data[3].username}</td>
					</tr>
					<tr>
						<td>{data[2].username}</td>
						<td></td>
						<td>{data[1].username}</td>
						<td></td>
						<td>{data[0].username}</td>
					</tr>
				</tbody>
			</table>
		);
}

export default WeeklyTable;