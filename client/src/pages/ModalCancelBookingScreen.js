import React from "react";
import { Icon, Button, Header, Modal, Segment } from "semantic-ui-react";
import { formatBookingDate } from "../util";

function ModalCancelBookingScreen({ booking, refreshBooking }) {
	const [open, setOpen] = React.useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		fetch(`/api/bookings/${booking.id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
			},
		}).then((response) => {
			if (response.status >= 200 && response.status <= 299) {
				setOpen(false);
				refreshBooking();
			} else {
				throw new Error("Unexpected error");
			}
		});
	};

	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={
				<Icon
					link
					name="trash alternate outline"
					color="orange"
					aria-label="Delete booking"
				/>
			}
		>
			<Header>Delete Your Booking</Header>
			<Modal.Content>
				<Modal.Description>
					<Segment>
						<p>Dear {booking.name},</p>
						<p>
							Are you sure you want delete your booking for "
							{formatBookingDate(booking.date)}"?
						</p>
					</Segment>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button.Group>
					<Button color="grey" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button.Or />
					<Button
						content="Delete Booking"
						type="submit"
						labelPosition="right"
						icon="checkmark"
						onClick={handleSubmit}
						color="orange"
					/>
				</Button.Group>
			</Modal.Actions>
		</Modal>
	);
}

export default ModalCancelBookingScreen;
