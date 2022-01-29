import React from "react";

import { useState } from "react";
import { formatBookingDate } from "../util";

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
	const [bookingErr, setBookingErr] = useState(false);
	const [nameErr, setNameErr] = useState(false);
	const [dontSelectDesk, setDontSelectDesk] = useState(true);
	const [deskId, setDeskId] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (name === "") {
			setNameErr(true);
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
					response.json();
					if (response.status >= 200 && response.status <= 299) {
						setBookingErr(false);
						setOpen(false);
						refreshBooking();
					} else {
						throw new Error(
							`Encountered something unexpected: ${response.status} ${response.statusText}`
						);
					}
				})
				.catch((err) => setBookingErr(true));
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
			<Modal.Content>
				<Modal.Description>
					{bookingErr && (
						<Message
							error
							header="An error occurred"
							content="We couldn't book a desk for you"
						/>
					)}
					<Form>
						<Segment>
							<Form.Field>
								<Form.Input
									error={
										nameErr && {
											content: "Please enter your name",
											pointing: "below",
										}
									}
									placeholder="Name"
									label="Name"
									onChange={(event) => {
										setName(event.target.value);
										setNameErr(false);
									}}
								/>
							</Form.Field>
							<Divider inverted />

							<label>Date: </label>

							<Form.Input
								placeholder="Date"
								label="Date"
								type="text"
								value={formatBookingDate(bookingDate)}
								disabled
							/>

							<input type="text" value={bookingDate} />
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
								<Dropdown
									placeholder="Desk Selection"
									options={deskSelection}
									selection
									value={deskId}
									onChange={(e, data) => setDeskId(data.value)}
								/>
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
							setBookingErr(false);
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
