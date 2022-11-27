<template>
	<div id="login">
		<div class="form">
			<input type="email" v-model="email" />
			<input type="password" v-model="password" />
			<div class="actions">
				<button type="submit" @click="login">Go</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(["handleLogin"]);

const email = ref("gagnon.kev@gmail.com");
const password = ref("pocpoc");

async function login() {
	const user = await signIn(email.value, password.value);
	emit("handleLogin", user);
}

onMounted(async () => {});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/login";
</style>
