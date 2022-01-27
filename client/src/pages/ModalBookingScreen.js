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
	Dropdown,
} from "semantic-ui-react";

const deskSelection = [
	{ key: 1, text: "Desk 1", value: 1 },
	{ key: 2, text: "Desk 2", value: 2 },
	{ key: 3, text: "Desk 3", value: 3 },
];

function ModalBookingScreen({ bookingDate }) {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = useState("");
	const [checked, setChecked] = useState(false);

	const handleCheck = () => {
		setChecked(!checked);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch("/api/bookings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: name,
				date: bookingDate,
			}),
		}).then((response) => {
			console.log(response.json());
			if (response.status >= 200 && response.status <= 299) {
				setOpen(false);
			} else {
				throw new Error(
					`Encountered something unexpected: ${response.status} ${response.statusText}`
				);
			}
		});
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
					<form>
						<Segment>
							<Form.Field>
								<label>Name: </label>
								<input
									placeholder="Name"
									value={name}
									onChange={(event) => setName(event.target.value)}
								/>
							</Form.Field>
							<Divider inverted />
							<label>Date: </label>
<<<<<<< Updated upstream
							<input
								type="text"
								value={formatBookingDate(bookingDate)}
								disabled
							/>
=======
							<input type="text" value={bookingDate} />
>>>>>>> Stashed changes
						</Segment>
						<Segment>
							<Form.Field>
								<Checkbox
									label="I don't care where I sit"
									defaultChecked
									onChange={handleCheck}
								/>
							</Form.Field>
							{checked && (
								<Dropdown
									placeholder="Desk Selection"
									options={deskSelection}
									selection
								/>
							)}
						</Segment>
					</form>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button.Group>
					<Button color="black" onClick={() => setOpen(false)}>
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
