<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';

import { useApartmentStore } from './../stores/ApartmentStore';

const router = useRouter();

const apartmentStore = useApartmentStore();

const apartment = computed(() => apartmentStore.apartment);
</script>

<template>
	<main>
		<Navbar />
	</main>
</template>

<style scoped>
main {
	width: 100%;
	height: 100vh;
	display: flex;
}
</style>
