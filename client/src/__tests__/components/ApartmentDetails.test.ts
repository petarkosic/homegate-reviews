import { render } from '@testing-library/vue';
import ApartmentDetails from '../../components/ApartmentDetails.vue';
import { createPinia, setActivePinia } from 'pinia';
import { Apartment, useApartmentStore } from '../../stores/ApartmentStore';
import { createTestingPinia } from '@pinia/testing';

// Mock apartment data
const mockApartment: Apartment = {
	apartment_id: '3003113399',
	address: 'Test Street 123',
	cost_of_rent: 1500,
	availability: 'Available now',
	living_space_sqm: 50,
	number_of_rooms: 2,
	description: 'This is a test apartment.',
	features_and_furnishings: ['Balcony', 'Dishwasher'],
	reviews: [
		{
			review_id: 10,
			review_text: 'Test Review',
			date_of_review: '2022-01-01',
			star_rating: 5,
			reviewer_id: 1,
			reviewer_first_name: 'John',
			reviewer_last_name: 'Doe',
			reviewer_email: 'johndoe@example.com',
			reviewer_registered_at: '2022-01-01',
		},
	],
};

render(ApartmentDetails, {
	global: {
		plugins: [
			setActivePinia(
				createTestingPinia({
					initialState: {
						apartment: mockApartment,
					},
					fakeApp: true,
					createSpy: vi.fn,
				})
			),
		],
	},
});

describe('ApartmentDetails', () => {
	beforeEach(() => {
		// creates a fresh pinia and makes it active
		// so it's automatically picked up by any useStore() call
		// without having to pass it to it: `useStore(pinia)`
		setActivePinia(createPinia());
	});

	it('should show "No apartment details available" message when no data exists', async () => {
		const { getAllByText } = render(ApartmentDetails);

		expect(getAllByText('No apartment details available.')).toBeTruthy();
	});

	it('should render no apartment details on initial load', async () => {
		const store = useApartmentStore();
		vi.spyOn(store, 'apartment', 'get').mockReturnValue(null);

		expect.assertions(4);

		const { queryByText, queryByRole } = render(ApartmentDetails);

		expect(queryByRole('heading')).toBeFalsy();

		expect(queryByRole('list')).toBeFalsy();

		expect(queryByText(/description/i)).toBeFalsy();

		expect(queryByText(/features/i)).toBeFalsy();
	});

	it('should render apartment details when apartment data exists', async () => {
		const store = useApartmentStore();
		vi.spyOn(store, 'getApartment').mockResolvedValue(mockApartment as any);

		expect.assertions(5);

		expect(store.apartment).toBeNull();
		expect(store.getApartment).not.toHaveBeenCalled();

		await expect(store.getApartment('123')).resolves.toEqual(mockApartment);

		expect(store.getApartment).toHaveBeenCalledTimes(1);
		expect(store.getApartment).toHaveBeenCalledWith('123');
	});
});
