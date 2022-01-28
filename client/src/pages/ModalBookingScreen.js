import React from "react";
import { useState } from "react";

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
} from "semantic-ui-react";

function ModalBookingScreen({ bookingDate }) {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = useState("");
	const [bookingErr, setBookingErr] = useState(false);
	const [nameErr, setNameErr] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (name === "") {
			setNameErr(true);
		} else {
			fetch("/api/bookings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					date: bookingDate,
				}),
			})
				.then((response) => {
					response.json()
					if (response.status >= 200 && response.status <= 299) {
						setBookingErr(false);
						setOpen(false);
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
							<Form.Input
								placeholder="Date"
								label="Date"
								type="text"
								value={bookingDate}
								disabled
							/>
						</Segment>
						<Segment>
							<Form.Field>
								<Checkbox label="I don't care where I sit" defaultChecked />
							</Form.Field>
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
