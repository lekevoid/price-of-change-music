<template>
	<div id="login">
		<div class="form">
			<input type="email" v-model="email" />
			<input type="password" v-model="password" />
			<button type="submit" @click="login">Go</button>
		</div>
	</div>
</template>

<script setup>
const email = ref("gagnon.kev@gmail.com");
const password = ref("pocpoc");

async function login() {
	const user = await signIn(email.value, password.value);
	console.log(user);
}

onMounted(async () => {});
</script>

<style lang="scss" scoped>
#login {
	border: 2px solid red;
	width: calc(100% - 20px);
	max-width: 500px;
	margin: 10px auto;

	.form {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		padding: 20px;
	}

	input {
	}

	button {
	}

	p {
		color: #fff;
	}
}
</style>
