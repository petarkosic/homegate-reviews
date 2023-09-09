<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usersData, usersFullNamesList } from '../helpers/usersData';

const emits = defineEmits(['update:isModalOpen']);

const router = useRouter();

const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);

const isModalOpen: Ref<boolean> = ref(true);

const selectedUser: Ref<string> = ref(usersFullNamesList[0]);

const email = ref(usersData[selectedUser.value].email);
const password = ref(usersData[selectedUser.value].password);

watch(selectedUser, (newValue) => {
	email.value = usersData[newValue].email;
	password.value = usersData[newValue].password;
});

const handleSubmit = async () => {
	if (!email.value) {
		emailError.value = 'Email cannot be empty';
	}

	if (!password.value) {
		passwordError.value = 'Password cannot be empty';
	}

	try {
		const response = await fetch('http://localhost:5000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem('token', data.access_token);
			localStorage.setItem('user', JSON.stringify(data));
			emailError.value = null;
			passwordError.value = null;
			isModalOpen.value = false;
			router.go(0);
		} else {
			emailError.value = 'Invalid email or password';
			passwordError.value = 'Invalid email or password';
		}
	} catch (error) {
		alert('Invalid email or password');
	}
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

const closeModal = (): void => {
	emits('update:isModalOpen');
};
</script>

<template>
	<div class="login">
		<div v-if="isModalOpen" @click="toggleModalOpen" class="modal">
			<div class="modal-content" @click.stop>
				<h2>Sign in</h2>
				<div class="form-wrapper">
					<form method="POST" @submit.prevent="handleSubmit">
						<div class="inputs">
							<div class="input-wrapper">
								<input type="text" name="email" id="email" v-model="email" />
								<label for="email">Email</label>
								<p v-if="emailError" class="error">{{ emailError }}</p>
							</div>
							<div class="input-wrapper">
								<input
									type="password"
									name="password"
									id="password"
									v-model="password"
								/>
								<label for="password">Password</label>
								<p v-if="passwordError" class="error">
									{{ passwordError }}
								</p>
							</div>
						</div>
						<button type="submit" class="submit">Sign in</button>
					</form>
				</div>
				<div>
					<h2>Log in as user:</h2>
					<select v-model="selectedUser">
						<option v-for="user in usersFullNamesList" :key="user">
							{{ user }}
						</option>
					</select>
				</div>
				<button class="modal-close" @click="closeModal">X</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
}

.modal-content {
	width: 400px;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	background: #1a1a1a;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 3rem;
	position: relative;
}

.modal-content h2 {
	text-align: left;
	margin: 0;
	padding: 40px 40px 24px;
}

.modal-content .submit {
	width: 100%;
	height: 52px;
	margin-top: 1.5rem;
	padding: 4px 1rem;
	font-size: 1rem;
	font-weight: bold;
	border: none;
	border-radius: 4px;
	background: #e5007d;
}

.modal-content .modal-close {
	all: unset;
	width: 10%;
	padding: 0;
	margin: 0;
	position: absolute;
	top: 10px;
	right: 0;
	font-size: 1.2rem;
	opacity: 0.5;
	border: 1px solid #1a1a1a;
	transition: all 0.2s ease-in-out;
}

.modal-content .modal-close:hover {
	cursor: pointer;
	border: 1px solid #e5007d;
	border-radius: 5px;
}

.form-wrapper {
	padding: 0 40px 40px;
	display: block;
}

form .input-wrapper {
	width: 100%;
	position: relative;
	margin-bottom: 20px;
}

.input-wrapper input {
	width: 90%;
	height: 52px;
	padding: 0 1rem;
	border: 1px solid #ccc;
	border-radius: 5px;
	transition: border-color 0.3s;
}

.input-wrapper input + label {
	position: absolute;
	top: 10px;
	left: 10px;
	font-size: 14px;
	color: #999;
	pointer-events: none;
	transition: top 0.3s, left 0.3s, font-size 0.3s, color 0.3s;
}

.input-wrapper input:focus + label,
.input-wrapper input:not(:placeholder-shown) + label {
	top: -10px;
	left: 1rem;
	font-size: 1rem;
	padding: 0 1rem;
	border-radius: 10px;
	color: #999;
	background: linear-gradient(to bottom, #1a1a1a, #333);
}

.input-wrapper input:not(:focus):not(:placeholder-shown) + label {
	top: 5px;
	left: 16px;
	padding: 10px;
	font-size: 1.125rem;
	color: #999;
	background: none;
}

.login {
	position: relative;
	flex-shrink: 0;
	height: 100%;
}

.login a {
	text-decoration: none;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
}

.error {
	color: red;
	font-size: 14px;
	margin-top: 5px;
}
</style>
