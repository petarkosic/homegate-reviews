<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import DisclaimerModal from '../components/DisclaimerModal.vue';
</script>

<template>
	<main>
		<Navbar />
	</main>
	<DisclaimerModal />
</template>

<style scoped>
main {
	width: 100%;
	height: 100vh;
	display: flex;
}
</style>
