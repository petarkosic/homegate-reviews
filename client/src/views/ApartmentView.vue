<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useApartmentStore } from './../stores/ApartmentStore';

const apartmentStore = useApartmentStore();

const apartment = computed(() => apartmentStore.apartment);
</script>

<template>
	<RouterLink :to="{ name: 'home' }">
		<div class="flex items-center gap-3">
			<i class="fa-solid fa-sun text-2xl"></i>
			<p class="text-2xl">Home Page</p>
		</div>
	</RouterLink>
	<div v-if="apartment">
		<h2>Apartment Name: {{ apartment.name }}</h2>
		<p>Apartment Description: {{ apartment.description }}</p>
		<!-- Add other apartment details as needed -->
	</div>
	<div v-else>
		<p>No apartment details available.</p>
	</div>
</template>

<style scoped></style>
