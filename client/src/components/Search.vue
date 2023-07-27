<template>
	<div>
		<input
			type="text"
			ref="searchInputRef"
			placeholder="Search"
			v-model="query"
			@input="handleInput"
		/>
		<button @click="searchApartments">Search</button>
	</div>
	<div v-if="emptyFieldError" class="error">
		{{ emptyFieldError }}
	</div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useApartmentStore } from '../stores/ApartmentStore';

export default {
	setup() {
		const query = ref('');
		const apartmentStore = useApartmentStore();
		const searchInputRef = ref<HTMLInputElement | null>(null);
		const emptyFieldError = ref<string | null>('');

		const handleInput = (e: Event) => {
			if (e.target instanceof HTMLInputElement) {
				query.value = e.target.value;
			}
		};

		const searchApartments = () => {
			if (query.value !== '') {
				apartmentStore.getApartment(query.value);
			} else {
				emptyFieldError.value = 'Search field cannot be empty';
			}
			setTimeout(() => {
				emptyFieldError.value = null;
			}, 3000);
		};

		onMounted(() => {
			searchInputRef.value?.focus();
		});

		return { query, searchApartments, emptyFieldError, handleInput };
	},
};
</script>

<style scoped>
input {
	width: 100%;
	height: 40px;
}
</style>
