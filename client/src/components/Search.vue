<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApartmentStore } from '../stores/ApartmentStore';
import { useDebounce } from './../helpers/useDebounce';
import { useRouter } from 'vue-router';

const router = useRouter();
const query = ref<string>('');
const apartmentStore = useApartmentStore();
const searchInputRef = ref<HTMLInputElement | null>(null);
const emptyFieldError = ref<string | null>('');

onMounted(() => {
	searchInputRef.value?.focus();
});

const handleInput = (e: Event) => {
	if (e.target instanceof HTMLInputElement) {
		query.value = e.target.value;
	}
};

const searchApartments = () => {
	if (query.value !== '' && query.value.charAt(0) !== '-') {
		apartmentStore.getApartment(query.value);
		router.push(`/${query.value}`);
	}
	if (query.value === '') {
		emptyFieldError.value = 'Search field cannot be empty';
	}
	if (query.value.charAt(0) === '-') {
		emptyFieldError.value = 'Search field cannot start with a dash';
	}
	setTimeout(() => {
		emptyFieldError.value = null;
	}, 3000);
};

const debouncedSearch = useDebounce(searchApartments, 1200);
</script>

<template>
	<div>
		<input
			type="text"
			ref="searchInputRef"
			placeholder="Search apartment by ID"
			v-model="query"
			@input="debouncedSearch"
		/>
		<button @click="searchApartments">Search</button>
	</div>
	<div v-if="emptyFieldError" class="error">
		{{ emptyFieldError }}
	</div>
</template>

<style scoped>
div {
	/* padding: 2rem; */
	display: flex;
	gap: 0.5rem;
}
input {
	width: 60%;
	min-width: 150px;
	height: 40px;
	border: none;
	border-radius: 6px;
	padding: 0 1rem;
}
</style>
