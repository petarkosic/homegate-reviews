<script setup lang="ts">
import { ComputedRef, computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getNumberOfImages } from '../helpers/numberOfImages';
import { useApartmentStore } from '../stores/ApartmentStore';

const router = useRouter();

const apartmentStore = useApartmentStore();

const apartment: any = computed(() => apartmentStore.apartment);

let apartmentId = ref(router.currentRoute.value.params.id);
const numOfImages: ComputedRef<number> = computed((): number =>
	getNumberOfImages(String(apartmentId.value))
);
const currentImageIndex = ref(1);

watch(
	() => router.currentRoute.value.params.id,
	(newValue) => {
		apartmentId.value = newValue;
		currentImageIndex.value = 1;
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
</template>

<style scoped>
img {
	width: 100%;
	height: 100%;
}

div {
	width: 100%;
	height: max-content;
}

.images {
	grid-area: images;
	display: flex;
	position: relative;
	width: 90%;
	margin: 0 auto;
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
</style>
