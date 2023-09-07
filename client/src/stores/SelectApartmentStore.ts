import { StoreDefinition, defineStore } from 'pinia';

export const useSelectApartmentStore: StoreDefinition<
	'selected-apartment',
	{
		apartmentID: string | null;
	},
	{},
	{
		selectApartment(id: string | null): Promise<void>;
	}
> = defineStore('selected-apartment', {
	state: (): { apartmentID: string | null } => ({
		apartmentID: null,
	}),
	actions: {
		async selectApartment(id: string) {
			try {
				this.apartmentID = id;
			} catch (error) {
				console.error(error);
			}
		},
	},
});
