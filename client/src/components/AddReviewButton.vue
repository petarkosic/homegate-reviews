<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import AddReviewModal from './AddReviewModal.vue';
import { useRouter } from 'vue-router';

let isModalOpen: Ref<boolean> = ref(false);

const router = useRouter();
let apartmentId = ref(router.currentRoute.value.params.id);

watch(
	() => router.currentRoute.value.params.id,
	(newValue) => {
		apartmentId.value = newValue;
		isModalOpen.value = false;
	}
);

const toggleModalOpen = (): void => {
	const isFocusedInput = document.activeElement instanceof HTMLTextAreaElement;
	if (isModalOpen.value && !isFocusedInput) {
		isModalOpen.value = false;
	} else {
		isModalOpen.value = true;
	}
};

const openModal = (): void => {
	isModalOpen.value = true;
};

const closeModal = (): void => {
	isModalOpen.value = false;
};
</script>
<template>
	<div class="wrapper">
		<button @click="openModal" class="review-button">
			<svg
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				class="Icon_icon_3pw5i HgMainNavItem_linkIcon_2Yare HgLink_icon_3Rqjm"
				style="width: 1.25rem; height: 1.25rem; transform: rotate(0deg)"
			>
				<path
					d="M12.1 6a2.1 2.1 0 11-4.2 0 2.1 2.1 0 014.2 0zm4 9v1.1H3.9V15c0-.64 3.13-2.1 6.1-2.1 2.97 0 6.1 1.46 6.1 2.1zM10 2C7.79 2 6 3.79 6 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"
					class="icon-fillable"
				></path>
			</svg>
			<div>
				<slot></slot>
			</div>
		</button>
	</div>

	<Transition>
		<AddReviewModal
			@click="toggleModalOpen"
			v-if="isModalOpen"
			:isModalOpen="isModalOpen"
			@update:is-modal-open="closeModal"
		/>
	</Transition>
</template>

<style scoped>
.wrapper {
	position: relative;
}
.review-button {
	height: 100%;
	padding: 2rem;
	display: flex;
	align-items: center;
	border: none;
	background: #242424;
	transition: all 0.125s ease-in-out;
}

.review-button:hover {
	background: #1a1a1a;
}

.icon-fillable {
	fill: #fff;
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.5;
}

.review-button div {
	margin-left: 0.5rem;
	white-space: nowrap;
	max-width: 170px;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
