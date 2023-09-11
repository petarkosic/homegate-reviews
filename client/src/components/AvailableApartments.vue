<script setup lang="ts">
import { Ref, ref } from 'vue';
import { getAllApartmentIDs } from '../helpers/numberOfImages';
import { useSelectApartmentStore } from '../stores/SelectApartmentStore';

const selectedApartmentID: Ref<string | null> = ref(null);
const isModalOpen: Ref<boolean> = ref(false);

const toggleModalOpen = () => {
	isModalOpen.value = !isModalOpen.value;
};

const selectApartmentStore = useSelectApartmentStore();

const handleClick = (id: string) => {
	selectedApartmentID.value = id;
	selectApartmentStore.selectApartment(selectedApartmentID.value);
	setTimeout(() => {
		isModalOpen.value = false;
	}, 0);
};
</script>

<template>
	<div class="icon">
		<button @click="toggleModalOpen">&#9432;</button>
		<div v-if="isModalOpen" class="modal">
			<h2>Available Apartment ID's</h2>
			<div>
				<ul>
					<li
						v-for="id in getAllApartmentIDs()"
						:key="id"
						@click="handleClick(id)"
					>
						{{ id }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<style scoped>
.icon {
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.icon button {
	height: 100%;
}

.modal {
	background: #1a1a1a;
	position: absolute;
	top: 100%;
	width: 300px;
	padding: 2rem;
	text-align: center;
	border-radius: 8px;
	z-index: 90;
}

ul {
	display: flex;
	flex-wrap: wrap;
	max-width: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden;
}

li {
	list-style-type: none;
	display: flex;
	flex-basis: 50%;
	max-width: 50%;
	margin-bottom: 0.5rem;
}

li:hover {
	cursor: pointer;
}

li::before {
	font-size: 1.5rem;
	line-height: 1;
	content: '• ';
	margin-right: 1rem;
}

li div {
	margin-left: 0.5rem;
	padding-right: 0.25rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

@media (max-width: 768px) {
	div button {
		width: max-content;
		padding: 0 1.187rem;
	}
}
</style>
