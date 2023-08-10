<script setup lang="ts">
import { computed } from 'vue';
import { useApartmentStore } from '../stores/ApartmentStore';
import { formatDate } from './../helpers/helpers';
import StarRating from './StarRating.vue';

const apartmentStore = useApartmentStore();

const apartment: any = computed(() => apartmentStore.apartment);
</script>

<template>
	<div v-if="apartment">
		<div class="reviews">
			<h2>Reviews</h2>
			<div v-for="(item, index) in apartment" :key="index" class="review">
				<div class="reviewer">
					<p class="name">
						{{ item?.reviewer_first_name }} {{ item?.reviewer_last_name }}
					</p>
					<StarRating :rating="item?.star_rating" />
				</div>
				<div class="review-data">
					<p class="review-text">{{ item?.review_text }}</p>
					<p class="review-date">{{ formatDate(item?.date_of_review) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
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
