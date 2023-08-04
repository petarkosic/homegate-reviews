<script setup lang="ts">
import { computed } from 'vue';
import { useApartmentStore } from './../stores/ApartmentStore';
import Navbar from '../components/Navbar.vue';

const apartmentStore = useApartmentStore();

const apartment: any = computed(() => apartmentStore.apartment);
</script>

<template>
	<section>
		<main>
			<Navbar />
		</main>
		<div class="grid-container">
			<div v-if="apartment">
				<div class="images">
					<h1>images</h1>
				</div>
			</div>
			<div v-if="apartment" class="apartment-details">
				<h2>
					{{ apartment?.[0]?.address }}
				</h2>
				<p>Rent: {{ apartment?.[0]?.cost_of_rent }} chf</p>
				<p>Available: {{ apartment?.[0]?.availability }}</p>
				<p>
					Living space: {{ apartment?.[0]?.living_space_sqm }} m<sup>2</sup>
				</p>
				<p>Number of rooms: {{ apartment?.[0]?.number_of_rooms }}</p>
				<p>
					{{ JSON.parse(apartment?.[0].description) }} Apartment Description:
				</p>
				<!-- Add other apartment details as needed -->
			</div>
			<div v-else class="no-apartment">
				<p>No apartment details available.</p>
			</div>
			<div v-if="apartment">
				<div class="reviews">
					<h2>Reviews</h2>
					<div v-for="(item, index) in apartment" :key="index" class="review">
						<p>
							{{ item?.reviewer_first_name }} {{ item?.reviewer_last_name }}
						</p>
						<p>{{ item?.review_text }}</p>
					</div>
				</div>
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
.grid-container {
	display: grid;
	grid-template-columns: 1.5fr 1fr;
	grid-template-rows: 1.5fr 1fr;
	gap: 2rem;
	grid-template-areas:
		'images apartment-details'
		'reviews reviews';
}

.no-apartment {
	grid-column: 1 / 3;
}

.images {
	grid-area: images;
}

.apartment-details {
	grid-area: apartment-details;
	text-align: left;
	padding: 20px;
}

.reviews {
	grid-area: reviews;
	text-align: left;
	padding: 20px;
}

sup {
	line-height: 1;
}
</style>
