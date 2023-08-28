<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './LoginModal.vue';

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
const isModalOpen: Ref<boolean> = ref(false);

const user = JSON.parse(localStorage.getItem('user') || 'null') as UserData;

const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	router.go(0);
};

const toggleModalOpen = (): void => {
	if (isModalOpen.value) {
		const hasFocusedInput = document.activeElement instanceof HTMLInputElement;
		if (!hasFocusedInput) {
			isModalOpen.value = false;
		}
	} else {
		isModalOpen.value = true;
	}
};
</script>
<template>
	<div class="wrapper">
		<button @click="toggleModalOpen" class="login-button">
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
			<div class="account">
				<slot></slot>
			</div>
		</button>

		<div v-if="user" class="logout">
			<button @click="logout">Logout</button>
		</div>
	</div>

	<LoginModal v-if="isModalOpen && !user" />
</template>

<style scoped>
.wrapper {
	position: relative;
}
.login-button {
	height: 100%;
	padding: 2rem;
	display: flex;
	align-items: center;
	border: none;
	background: #242424;
	transition: all 0.125s ease-in-out;
}

.login-button:hover {
	background: #1a1a1a;
}

.icon-fillable {
	fill: #fff;
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.5;
}

.account {
	margin-left: 0.5rem;
	white-space: nowrap;
	max-width: 170px;
}

.account .account-user::after {
	content: '';
}

.account .hello-user::after {
	content: '\25bc';
	position: absolute;
	bottom: 0;
	right: 0;
	padding: 0.2rem;
	opacity: 0.4;
}

.logout {
	width: 100%;
	position: absolute;
	top: 50%;
	opacity: 0;
	transition: all 0.3s ease-in-out;
}

.wrapper:hover .logout {
	opacity: 1;
	top: 100%;
}

.logout button {
	width: 100%;
	padding: 1rem 0;
	color: #e5007d;
}

.logout button:hover {
	border: 1px solid #e5007d;
}
</style>
