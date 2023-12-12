import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';
import AvailableApartments from '../../components/AvailableApartments.vue';
import { useSelectApartmentStore } from '../../stores/SelectApartmentStore';

describe('AvailableApartments', () => {
	beforeEach(() => {
		// creates a fresh pinia and makes it active
		// so it's automatically picked up by any useStore() call
		// without having to pass it to it: `useStore(pinia)`
		setActivePinia(createPinia());
	});

	it('should toggle modal visibility on button click', async () => {
		expect.assertions(3);

		const { getByRole, getByText } = render(AvailableApartments);

		expect(screen.queryByText("Available Apartment ID's")).toBeNull();

		await fireEvent.click(getByRole('button'));

		expect(screen.getByText("Available Apartment ID's")).toBeTruthy();

		await fireEvent.click(getByText('3003113399'));

		await new Promise((resolve) => setTimeout(resolve, 10));
		await waitFor(() => {
			expect(screen.queryByText("Available Apartment ID's")).toBeNull();
		});
	});

	it('should render a list of available apartment IDs (3003113399, 3003113400, 3003113401)', async () => {
		const { getByRole } = render(AvailableApartments);

		await fireEvent.click(getByRole('button'));

		const expectedApartmentIDs = ['3003113399', '3003238714', '3003264256'];

		expectedApartmentIDs.forEach((id) => {
			expect(screen.queryByText(id)).toBeTruthy();
		});
	});

	it('should trigger selectApartment action when a list item is clicked', async () => {
		const store = useSelectApartmentStore();
		vi.spyOn(store, 'selectApartment');

		const { getByRole, getByText } = render(AvailableApartments);

		await fireEvent.click(getByRole('button'));

		const apartmentIdToClick = '3003113399';

		await fireEvent.click(getByText(apartmentIdToClick));

		expect(store.selectApartment).toHaveBeenCalledWith(apartmentIdToClick);
	});
});
