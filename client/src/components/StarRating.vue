<script setup lang="ts">
const { rating } = defineProps({
	rating: Number,
});
</script>

<template>
	<div class="star icon-star" :class="`star_rating-${rating}`"></div>
</template>

<style scoped>
.star {
	background-image: url('star_rating.png');
	background-size: 512px 512px;
	background-repeat: no-repeat;
}

.icon-star {
	height: 18px;
	width: 80px;
}

.star_rating-5 {
	background-position: -2px 0px;
}

.star_rating-4 {
	background-position: -2px -20px;
}

.star_rating-3 {
	background-position: -2px -60px;
}

.star_rating-2 {
	background-position: -2px -100px;
}

.star_rating-1 {
	background-position: -2px -140px;
}
</style>
