import React, { useState } from "react";
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

function ModalBookingScreen({
	bookingDate,
	refreshBooking,
	desks,
	users,
	bookingsByDate,
}) {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = useState(null);
	const [dontSelectDesk, setDontSelectDesk] = useState(true);
	const [deskId, setDeskId] = useState(null);
	const [bookingErrorMessage, setBookingErrorMessage] = useState(null);
	const [nameErrorMessage, setNameErrorMessage] = useState(null);
	const [dateErrorMessage, setDateErrorMessage] = useState(null);
	const [deskErrorMessage, setDeskErrorMessage] = useState(null);

	const deskSelection = desks.map((desk) => ({
		key: desk.id,
		text: desk.name,
		value: desk.id,
	}));

	const userOptions = users.map((e) => ({
		key: e.id,
		text: e.username,
		value: e.username,
	}));

	const handleSubmit = (event) => {
		event.preventDefault();

		setBookingErrorMessage(null);

		if (!name) {
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
				.then(async (response) => {
					if (response.status >= 200 && response.status <= 299) {
						setOpen(false);
						refreshBooking();
						setName(null);
						setDeskId(null);
					} else {
						const error = await response.json();
						if (error.field === "name") {
							setNameErrorMessage(error.message);
						} else if (error.field === "date") {
							setDateErrorMessage(error.message);
						} else if (error.field === "desk") {
							setDeskErrorMessage(error.message);
						} else {
							throw new Error("Booking not created, unexpected error");
						}
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
				<Icon link name="add" size="small" circular inverted color="teal" />
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
					<Form error={!!deskErrorMessage || !!nameErrorMessage}>
						<Segment>
							<Form.Field>
								<label>Name: </label>
								<Dropdown
									onSearchChange={() => setName(null)}
									error={!!nameErrorMessage}
									placeholder="Select your name"
									options={userOptions}
									selection
									search
									value={name}
									onChange={(e, data) => {
										setNameErrorMessage(null);
										setName(data.value);
									}}
								/>
							</Form.Field>
							<Divider inverted />
							<label>Date: </label>
							<Form.Input
								error={
									dateErrorMessage && {
										content: dateErrorMessage,
										pointing: "below",
									}
								}
								placeholder="Date"
								type="text"
								value={formatBookingDate(bookingDate)}
								readOnly
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
								<Form.Field>
									<Message
										error
										content={deskErrorMessage}
										style={{ width: "200px" }}
									/>
									<Dropdown
										error={!!deskErrorMessage}
										placeholder="Desk Selection"
										options={deskSelection}
										selection
										value={deskId}
										onChange={(e, data) => {
											setDeskErrorMessage(null);
											setDeskId(data.value);
										}}
									/>
									<br />
									<FloorPlan desks={desks} bookingsByDate={bookingsByDate} />
								</Form.Field>
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
							setDateErrorMessage(null);
							setBookingErrorMessage(null);
							setNameErrorMessage(null);
							setDeskErrorMessage(null);
							setName(null);
							setOpen(false);
							setDeskId(null);
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
