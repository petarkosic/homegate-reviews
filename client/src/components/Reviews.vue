<script setup lang="ts">
import { computed, ref } from 'vue';
import { useApartmentStore } from '../stores/ApartmentStore';
import { formatDate } from './../helpers/helpers';
import StarRating from './StarRating.vue';
import LoginModal from './LoginModal.vue';
import AddReviewModal from './AddReviewModal.vue';

interface UserData {
	user_id: number;
	first_name: string;
	last_name: string;
	email: string;
	registered_at: string;
	access_token: string;
	message: string;
}

const user = JSON.parse(localStorage.getItem('user') || 'null') as UserData;
const isLoggedIn = ref<boolean>(user ? true : false);
const shouldOpenModal = ref<boolean>(false);

const apartmentStore = useApartmentStore();

const apartment: any = computed(() => apartmentStore.apartment);

const handleReviewModal = (): void => {
	if (!user) {
		shouldOpenModal.value = true;
		isLoggedIn.value = false;
	} else {
		shouldOpenModal.value = true;
		isLoggedIn.value = true;
	}
};

const closeModals = (): void => {
	isLoggedIn.value = false;
	shouldOpenModal.value = false;
};
</script>

<template>
	<div v-if="apartment" class="reviews-wrapper">
		<div class="reviews">
			<div class="review-add">
				<h2>Reviews</h2>
				<button @click="handleReviewModal">
					{{ user ? 'Add a Review' : 'Login to Review' }}
				</button>
			</div>
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
		<div v-if="shouldOpenModal" class="modals">
			<LoginModal v-if="!isLoggedIn && shouldOpenModal" @close="closeModals" />
			<AddReviewModal
				v-else-if="isLoggedIn && shouldOpenModal"
				@close="closeModals"
			/>
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

.review-add {
	display: flex;
	align-items: center;
	gap: 4rem;
}

.review-add button {
	padding: 1rem 2rem;
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

.modals {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
}
</style>
