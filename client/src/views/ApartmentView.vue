<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useApartmentStore } from './../stores/ApartmentStore';
import Navbar from '../components/Navbar.vue';
import Reviews from '../components/Reviews.vue';
import ImageSlider from '../components/ImageSlider.vue';
import ApartmentDetails from '../components/ApartmentDetails.vue';

const router = useRouter();

const apartmentStore = useApartmentStore();

let apartmentId = ref(router.currentRoute.value.params.id);

watch(
	() => router.currentRoute.value.params.id,
	(newValue) => {
		apartmentId.value = newValue;
		apartmentStore.getApartment(String(newValue));
	}
);
</script>

<template>
	<section>
		<main>
			<Navbar />
		</main>
		<div class="grid-container">
			<ImageSlider />
			<ApartmentDetails />
			<Reviews />
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

.grid-container {
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	grid-template-rows: auto auto;
	gap: 2rem;
	grid-template-areas:
		'images apartment-details'
		'reviews reviews';
}
</style>
