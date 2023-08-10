<script setup lang="ts">
import { computed } from 'vue';
import { useApartmentStore } from '../stores/ApartmentStore';
import { formatNumber } from '../helpers/helpers';

const apartmentStore = useApartmentStore();

const apartment: any = computed(() => apartmentStore.apartment);
</script>

<template>
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
						v-for="(feat, index) in apartment?.[0]?.features_and_furnishings"
						:key="index"
					>
						<div>{{ feat }}</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div v-else class="no-apartment">
		<p>No apartment details available.</p>
	</div>
</template>

<style scoped>
.no-apartment {
	grid-column: 1 / 3;
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
</style>
