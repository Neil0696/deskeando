import React from "react";

import { useState } from "react";
import { formatBookingDate } from "../util";
import FloorPlan from "./FloorPlan";

import {
	Icon,
	Form,
	Checkbox,
	Segment,
	Divider,
	Button,
	Header,
	Modal,
	Message,
	Dropdown,
} from "semantic-ui-react";

const deskSelection = [
	{ key: 1, text: "Desk 1", value: 1 },
	{ key: 2, text: "Desk 2", value: 2 },
	{ key: 3, text: "Desk 3", value: 3 },
];

function ModalBookingScreen({ bookingDate, refreshBooking }) {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = useState("");
	const [dontSelectDesk, setDontSelectDesk] = useState(true);
	const [deskId, setDeskId] = useState(null);
	const [bookingErrorMessage, setBookingErrorMessage] = useState(null);
	const [nameErrorMessage, setNameErrorMessage] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();

		setBookingErrorMessage(null);

		if (name === "") {
			setNameErrorMessage("Please enter your name");
		} else {
			let newBooking = {
				name: name,
				date: bookingDate,
			};
			if (!dontSelectDesk) {
				newBooking.desk_id = deskId;
			}

			fetch("/api/bookings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBooking),
			})
				.then((response) => {
					if (response.status >= 200 && response.status <= 299) {
						setOpen(false);
						refreshBooking();
					} else {
						// return so the error is caught by catch
						return response.json().then((error) => {
							if (error.field === "name") {
								setNameErrorMessage(error.message);
							} else {
								throw new Error("Booking not created, unexpected error");
							}
						});
					}
				})
				.catch((error) => setBookingErrorMessage(error.message));
		}
	};

	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={
				<Icon
					link
					name="add"
					size="small"
					circular
					inverted
					color="teal"
				/>
			}
		>
			<Header as="h2" content="Book Your Desk" />
			<Modal.Content scrolling>
				<Modal.Description>
					{bookingErrorMessage && (
						<Message
							error
							header="An error occurred"
							content={bookingErrorMessage}
						/>
					)}
					<Form>
						<Segment>
							<Form.Field>
								<Form.Input
									error={
										nameErrorMessage && {
											content: nameErrorMessage,
											pointing: "below",
										}
									}
									placeholder="Name"
									label="Name"
									onChange={(event) => {
										setName(event.target.value);
										setNameErrorMessage(null);
									}}
								/>
							</Form.Field>
							<Divider inverted />

							<label>Date: </label>

							<Form.Input
								placeholder="Date"
								type="text"
								value={formatBookingDate(bookingDate)}
								disabled
							/>
						</Segment>
						<Segment>
							<Form.Field>
								<Checkbox
									label="I don't care where I sit"
									onChange={(e, data) => setDontSelectDesk(data.checked)}
									checked={dontSelectDesk}
								/>
							</Form.Field>
							{!dontSelectDesk && (
								<div>
									<Dropdown
										placeholder="Desk Selection"
										options={deskSelection}
										selection
										value={deskId}
										onChange={(e, data) => setDeskId(data.value)}
									/>
									<br />
									<FloorPlan />
								</div>
							)}
						</Segment>
					</Form>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button.Group>
					<Button
						color="black"
						onClick={() => {
							setBookingErrorMessage(false);
							setOpen(false);
						}}
					>
						Cancel
					</Button>
					<Button.Or />
					<Button
						content="Create Booking"
						type="submit"
						labelPosition="right"
						icon="checkmark"
						onClick={handleSubmit}
						positive
					/>
				</Button.Group>
			</Modal.Actions>
		</Modal>
	);
}

export default ModalBookingScreen;
