import { StoreDefinition, defineStore } from 'pinia';

export interface Apartment {
	apartment_id: string;
	cost_of_rent: number;
	number_of_rooms: number;
	living_space_sqm: number;
	address: string;
	availability: string;
	description: string;
	features_and_furnishings: string[] | [];
	reviews?: Review[];
}

export interface Review {
	review_id: number;
	review_text: string;
	date_of_review: string;
	star_rating: number;
	reviewer_id: number;
	reviewer_first_name: string;
	reviewer_last_name: string;
	reviewer_email: string;
	reviewer_registered_at: string;
}

export const useApartmentStore: StoreDefinition<
	'apartment',
	{
		apartment: Apartment | null;
	},
	{},
	{
		getApartment(id: string | null): Promise<void>;
	}
> = defineStore('apartment', {
	state: (): { apartment: Apartment | null } => ({
		apartment: null,
	}),
	actions: {
		async getApartment(id: string) {
			try {
				const response = await fetch(`http://localhost:5000/apartment/${id}`);
				const apartmentData = await response.json();
				this.apartment = apartmentData.data;
			} catch (error) {
				console.error(error);
			}
		},
	},
});
