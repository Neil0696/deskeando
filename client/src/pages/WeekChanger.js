import React from "react";

const WeekChanger = ({
	week,
	currentMonday,
	setCurrentMonday,
	startOfTheWeekDate,
}) => {
	const year = currentMonday.getFullYear();
	const month = currentMonday.getMonth();
	let date = currentMonday.getDate();

	for (let i = 0; i < 5; i++) {
		week.push(new Date(year, month, date + i).toISOString());
	}

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
		<div className="inner">
			<button onClick={setThisMonday}>This week</button>
			<button onClick={setPreviousMonday}>Previous week</button>
			<button onClick={setNextMonday}>Next Week</button>
		</div>
	);
};

export default WeekChanger;
