<script lang="ts">
import Search from './components/Search.vue';
import { computed } from 'vue';
import { useApartmentStore } from './stores/ApartmentStore';

export default {
	components: {
		Search,
	},
	setup() {
		const apartmentStore = useApartmentStore();

		const apartment = computed(() => apartmentStore.apartment);

		return { apartment };
	},
};
</script>

<template>
	<Search />
	<div v-if="apartment">
		<h2>{{ apartment.name }}</h2>
		<p>{{ apartment.description }}</p>
		<!-- Add other apartment details as needed -->
	</div>
	<div v-else>
		<p>No apartment details available.</p>
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
