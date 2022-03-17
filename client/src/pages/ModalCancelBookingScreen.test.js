import {
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import ModalCancelBookingScreen from "./ModalCancelBookingScreen";

const server = setupServer(
	rest.delete("/api/bookings/*", (req, res, ctx) => {
		return res(ctx.status(204));
	})
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ModalCancelBookingScreen component", () => {
	it("does not display the modal by default", () => {
		render(<ModalCancelBookingScreen booking={{}} refreshBooking={() => {}} />);

		const modalTitle = screen.queryByText("Delete Your Booking");

		expect(modalTitle).not.toBeInTheDocument();
	});

	it("displays the modal when clicked", () => {
		render(
			<ModalCancelBookingScreen
				booking={{ name: "Maha", date: "2022-01-17T00:00:00.000Z", id: 1 }}
				refreshBooking={() => {}}
			/>
		);
		const deleteButton = screen.getByLabelText("Delete booking");

		userEvent.click(deleteButton);

		expect(screen.getByText("Delete Your Booking")).toBeInTheDocument();
		expect(screen.getByText("Dear Maha,")).toBeInTheDocument();
		expect(
			screen.getByText(
				'Are you sure you want delete your booking for "Mon Jan 17th"?'
			)
		).toBeInTheDocument();
	});

	it("Deletes a booking when Delete booking is pressed", async () => {
		const mockRefresh = jest.fn();
		render(
			<ModalCancelBookingScreen
				booking={{ name: "Maha", date: "2022-01-17T00:00:00.000Z", id: 1 }}
				refreshBooking={mockRefresh}
			/>
		);
		userEvent.click(screen.getByLabelText("Delete booking"));

		const confirmDeleteButton = screen.getByRole("button", {
			name: "Delete Booking",
		});

		userEvent.click(confirmDeleteButton);
		await waitForElementToBeRemoved(() =>
			screen.getByRole("button", { name: "Delete Booking" })
		);

		expect(mockRefresh.mock.calls.length).toBe(1);
	});
});
