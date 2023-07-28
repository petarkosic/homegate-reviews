<script setup lang="ts">
import Search from './../components/Search.vue';
import { computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import { useApartmentStore } from './../stores/ApartmentStore';

const router = useRouter();

const apartmentStore = useApartmentStore();

const apartment = computed(() => apartmentStore.apartment);
</script>

<template>
	<main>
		<RouterLink :to="{ name: 'home' }">
			<div class="flex items-center gap-3">
				<i class="fa-solid fa-sun text-2xl"></i>
				<p class="text-2xl">Home Page</p>
			</div>
		</RouterLink>
		<Search />
	</main>
</template>

<style scoped></style>
