import React from "react";
import { Icon, Button, Header, Modal, Segment } from "semantic-ui-react";

function ModalCancelBookingScreen({ booking, refreshBooking }) {
	const [open, setOpen] = React.useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(`/api/bookings/${booking.id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/jason",
			},
		}).then((response) => {
			setOpen(false);
			refreshBooking();
		});
	};

	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			size="tiny"
			trigger={
				<Icon link name="trash alternate outline" size="large" color="yellow" />
			}
		>
			<Header>Delete Your Booking</Header>
			<Modal.Content>
				<Modal.Description>
					<Segment>
						<pre>{JSON.stringify(booking, null, 2)}</pre>
						<p>Are you sure you want delete your booking?</p>
					</Segment>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button.Group>
					<Button color="black" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button.Or />
					<Button
						content="Delete Booking"
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

export default ModalCancelBookingScreen;
