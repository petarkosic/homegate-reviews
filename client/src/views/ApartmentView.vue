<script setup lang="ts">
import { ref, computed, watch, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useApartmentStore } from './../stores/ApartmentStore';
import Navbar from '../components/Navbar.vue';
import { getNumberOfImages } from './../helpers/numberOfImages';
import { formatNumber, formatDate } from '../helpers/helpers';

const router = useRouter();

const apartmentStore = useApartmentStore();

const apartment: any = computed(() => apartmentStore.apartment);
let apartmentId = ref(router.currentRoute.value.params.id);
const numOfImages: ComputedRef<number> = computed((): number =>
	getNumberOfImages(String(apartmentId.value))
);
let currentImageIndex = ref(1);

watch(
	() => router.currentRoute.value.params.id,
	(newValue) => {
		apartmentId.value = newValue;
		currentImageIndex.value = 1;
		apartmentStore.getApartment(String(newValue));
	}
);

function previousImage(): void {
	if (currentImageIndex.value === 1) {
		currentImageIndex.value = numOfImages.value;
	} else {
		currentImageIndex.value--;
	}
}

function nextImage(): void {
	if (currentImageIndex.value === numOfImages.value) {
		currentImageIndex.value = 1;
	} else {
		currentImageIndex.value++;
	}
}
</script>

<template>
	<section>
		<main>
			<Navbar />
		</main>
		<div class="grid-container">
			<div v-if="apartment">
				<div class="images">
					<button class="previous" @click="previousImage">&lt;</button>
					<div class="image">
						<img
							:src="`/src/assets/${apartmentId}/${currentImageIndex}.avif`"
							alt=""
						/>
					</div>
					<button class="next" @click="nextImage">&gt;</button>
				</div>
			</div>
			<div v-if="apartment" class="apartment-details">
				<h2>
					{{ apartment?.[0]?.address }}
				</h2>
				<ul class="main-info">
					<li>
						<p class="label">Rent:</p>
						<span class="value"
							>{{ formatNumber(apartment?.[0]?.cost_of_rent) }}.-</span
						>
					</li>
					<li>
						<p class="label">Available:</p>
						<span class="value">{{ apartment?.[0]?.availability }}</span>
					</li>
					<li>
						<p class="label">Living space:</p>
						<span class="value"
							>{{ apartment?.[0]?.living_space_sqm }} m<sup>2</sup></span
						>
					</li>
					<li>
						<p class="label">Rooms:</p>
						<span class="value">{{ apartment?.[0]?.number_of_rooms }}</span>
					</li>
				</ul>
				<div class="description">
					<h2 class="label">Description:</h2>
					<span class="value">
						{{ JSON.parse(apartment?.[0].description) }}
					</span>
				</div>
				<div v-if="apartment?.[0]?.features_and_furnishings.length !== 0">
					<div class="features">
						<h2 class="label">Features and furnishings:</h2>
						<ul>
							<li
								v-for="(feat, index) in apartment?.[0]
									?.features_and_furnishings"
								:key="index"
							>
								<div>{{ feat }}</div>
							</li>
						</ul>
					</div>
				</div>
				<!-- Add other apartment details as needed -->
			</div>
			<div v-else class="no-apartment">
				<p>No apartment details available.</p>
			</div>
			<div v-if="apartment">
				<div class="reviews">
					<h2>Reviews</h2>
					<div v-for="(item, index) in apartment" :key="index" class="review">
						<div class="reviewer">
							<p class="name">
								{{ item?.reviewer_first_name }} {{ item?.reviewer_last_name }}
							</p>
						</div>
						<div class="review-data">
							<p class="review-text">{{ item?.review_text }}</p>
							<p class="review-date">{{ formatDate(item?.date_of_review) }}</p>
						</div>
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
	grid-template-rows: 1fr 1fr;
	gap: 2rem;
	grid-template-areas:
		'images apartment-details'
		'reviews reviews';
}

img {
	width: 100%;
	height: 100%;
}

.no-apartment {
	grid-column: 1 / 3;
}

.images {
	grid-area: images;
	display: flex;
	position: relative;
}

.image {
	width: 100%;
	display: flex;
}

img {
	display: block;
	object-fit: cover;
	aspect-ratio: 1 / 1;
}

button {
	background: rgba(0, 0, 0, 0.3);
	height: 20%;
	margin: auto 0;
	font-size: 2rem;
	font-weight: bold;
	border: none;
	border-radius: 0;
	transition: all 0.1s ease-in-out;
}

button:hover {
	background: rgba(0, 0, 0, 0.4);
}

button:focus {
	outline: none;
}

button.previous {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	border-radius: 0 1rem 1rem 0;
}

button.next {
	/* background: blue; */
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	border-radius: 1rem 0 0 1rem;
}

.apartment-details {
	grid-area: apartment-details;
	text-align: left;
	padding: 20px;
	display: flex;
	flex-direction: column;
}

.main-info {
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}

.main-info li {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	list-style-type: none;
}

.main-info .label {
	width: 100%;
	height: 100%;
	margin: 0;
}

.main-info .value {
	font-weight: bold;
}

.features ul {
	display: flex;
	flex-wrap: wrap;
	max-width: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden;
	list-style: none;
}

.features ul li {
	display: flex;
	flex-basis: 50%;
	max-width: 50%;
}

.features ul li::before {
	font-size: 1.5rem;
	line-height: 1;
	content: '• ';
}

.features ul li div {
	margin-left: 0.5rem;
	padding-right: 0.25rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.reviews {
	grid-area: reviews;
	text-align: left;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.review {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.reviewer p {
	margin: 0;
}

.name {
	font-weight: bold;
}

.review-data p {
	margin: 0;
}

.review-date {
	opacity: 0.5;
}

.review-data sup {
	line-height: 1;
}
</style>
