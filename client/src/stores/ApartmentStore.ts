import { defineStore } from 'pinia';

export const useApartmentStore = defineStore('apartment', {
	state: () => ({
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
