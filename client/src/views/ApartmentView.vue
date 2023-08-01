<script setup lang="ts">
import { computed } from 'vue';
import { useApartmentStore } from './../stores/ApartmentStore';
import Navbar from '../components/Navbar.vue';

const apartmentStore = useApartmentStore();

const apartment = computed(() => apartmentStore.apartment);
</script>

<template>
	<section>
		<main>
			<Navbar />
		</main>
		<div>
			<div v-if="apartment" class="wrapper">
				<h2>Apartment Name: {{ apartment.name }}</h2>
				<p>Apartment Description: {{ apartment.description }}</p>
				<!-- Add other apartment details as needed -->
			</div>
			<div v-else>
				<p>No apartment details available.</p>
			</div>
		</div>
	</section>
</template>

<style scoped>
section {
	width: 100%;
	height: 100vh;
}

main {
	display: flex;
}
</style>
