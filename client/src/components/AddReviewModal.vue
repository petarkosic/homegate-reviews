<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

let { isModalOpen } = defineProps({
	isModalOpen: Boolean,
});

const emits = defineEmits(['update:isModalOpen']);

interface UserData {
	user_id: number;
	first_name: string;
	last_name: string;
	email: string;
	registered_at: string;
	access_token: string;
	message: string;
}

const router = useRouter();
const apartmentId = ref(router.currentRoute.value.params.id);

const user = JSON.parse(localStorage.getItem('user') || 'null') as UserData;
const dateFormatted = new Date(user?.registered_at).toLocaleDateString('en-GB');

const starRatings: Array<number> = [1, 2, 3, 4, 5];
const selectedRating: Ref<number | null> = ref(null);
const selectedRatingError: Ref<string | null> = ref(null);

const textarea: Ref<string> = ref('');
const textareaError: Ref<string | null> = ref(null);

const handleSubmit = async () => {
	if (!textarea.value) {
		textareaError.value = 'Text cannot be empty';
		return;
	}

	if (textarea.value.length > 500) {
		textareaError.value = 'Text cannot be longer than 500 characters';
		return;
	}

	if (selectedRating.value && !textarea.value) {
		selectedRatingError.value = 'You must select a rating';
		return;
	}

	try {
		const response = await fetch('http://localhost:5000/reviews', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: user.user_id,
				apartment_id: apartmentId.value,
				review_text: textarea.value,
				star_rating: selectedRating.value,
			}),
		});

		if (response.ok) {
			textarea.value = '';
			textareaError.value = null;
			selectedRating.value = null;
			selectedRatingError.value = null;
			router.go(0);
		} else {
			textareaError.value = 'Text cannot be empty';
			selectedRatingError.value = 'You must select a rating';
		}
	} catch (error) {
		alert('Invalid textarea or star rating');
	}
};

const closeModal = (): void => {
	emits('update:isModalOpen');
};

const selectRating = (rating: number): void => {
	selectedRating.value = rating;
};
</script>

<template>
	<div class="add-review-wrapper">
		<div v-if="isModalOpen" class="modal">
			<div class="review" @click.stop>
				<div class="user">
					<h2>Logged in as: {{ user?.first_name }} {{ user?.last_name }}</h2>
					<p>
						Member since:
						{{ dateFormatted }}
					</p>
				</div>
				<form method="POST" @submit.prevent="handleSubmit">
					<div class="textarea-wrapper">
						<div v-if="textareaError" class="error">{{ textareaError }}</div>
						<textarea
							name="review"
							id="review"
							cols="20"
							rows="10"
							maxlength="500"
							v-model="textarea"
						></textarea>
					</div>
					<div class="star-rating">
						<div v-if="selectedRatingError" class="error">
							{{ selectedRatingError }}
						</div>

						<p>Rating:</p>
						<ul>
							<li
								v-for="rating in starRatings"
								:key="rating"
								@click="selectRating(rating)"
								:class="{ active: selectedRating === rating }"
							>
								{{ rating }}
							</li>
						</ul>
					</div>
					<button class="submit">Submit a review</button>
				</form>
				<button class="modal-close" @click="closeModal">X</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.add-review-wrapper {
	position: relative;
}
.modal {
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

.review {
	border-radius: 8px;
	padding: 1rem;
	position: relative;
	top: -0.5rem;
	left: -0.5rem;
	position: relative;
	background: #242424;
}

.review .user {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.review .user p {
	color: gray;
}

.review .user h2,
.review .user p {
	margin: 0;
}

.textarea-wrapper {
	width: 700px;
	height: 150px;
	max-width: 700px;
	max-height: 150px;
	min-width: 300px;
	min-height: 100px;
}

textarea {
	all: unset;
	width: 100%;
	height: 100%;
	border-radius: 8px;
	word-wrap: break-word;
	position: relative;
	background: #1a1a1a;
}

.star-rating {
	margin: 1rem 0;
	background: #1a1a1a;
}

.star-rating p {
	margin: 1rem;
}

.star-rating ul {
	width: 100%;
	height: 40px;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: 1rem;
	margin-bottom: 1rem;
}

.star-rating ul li {
	list-style: none;
	width: 100%;
	height: 100%;
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
}

.star-rating ul li:hover {
	cursor: pointer;
	outline: 1px solid #e5007d;
	border-radius: 8px;
}

.star-rating li.active {
	outline: 1px solid #e5007d;
	border-radius: 8px;
	box-shadow: inset 0 0 5px 0 #e5007d;
}

.modal .modal-close {
	all: unset;
	width: 10%;
	padding: 0;
	margin: 0;
	position: absolute;
	right: 1rem;
	font-size: 1.2rem;
	text-align: center;
	border: 1px solid #242424;
	transition: all 0.2s ease-in-out;
}

.modal .modal-close:hover {
	cursor: pointer;
	border: 1px solid #e5007d;
	border-radius: 5px;
}

.submit {
	width: 100%;
	font-weight: bold;
}

.error {
	color: red;
	font-size: 14px;
	margin-top: 5px;
}
</style>
