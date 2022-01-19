import React from "react";

import TableHeading from "./TableHeading";

const WeeklyTable = (props) => {
	return (
		<div>
			<table className="table">
				<TableHeading />
				<tbody>
					{props.result.map((info, index) => (
						<tr key={index}>
							<td>{info.username}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default WeeklyTable;
