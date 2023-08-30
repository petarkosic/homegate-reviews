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
let apartmentId: string = ref(router.currentRoute.value.params.id);

const user = JSON.parse(localStorage.getItem('user') || 'null') as UserData;
const dateFormatted = new Date(user?.registered_at).toLocaleDateString('en-GB');

const starRatings: Array<number> = [1, 2, 3, 4, 5];
const selectedRating: Ref<number | null> = ref(null);

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
				<div class="textarea-wrapper">
					<textarea name="review" id="review" cols="20" rows="10"></textarea>
				</div>
				<div class="star-rating">
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
				<button class="modal-close" @click="closeModal">X</button>
				<button>Submit as review</button>
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

.star-rating ul {
	width: 100%;
	height: 40px;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: 1rem;
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
</style>
