<template>
	<Login v-if="!firebaseUser" @handleLogin="handleUser" />
	<!-- <ThePlaylist v-if="firebaseUser" /> -->
	<ThePlaylist />
</template>

<script setup>
const firebaseUser = useFirebaseUser();

function handleUser({ user }) {
	if (user && user.uid) {
		loggedIn.value = true;
	}
}

onMounted(async () => {});
</script>

<style lang="scss">
@import "~/assets/styles/base";
@import "~/assets/styles/theme";
</style>
