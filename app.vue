<template>
	<div id="global">
		<div :class="['tabs', { active: currentCategory === category }]" v-for="category in categories" :key="category" @click="setCategory(category)">
			{{ category }}
		</div>
		<button>Test</button>
		<pre>{{ tracks }}</pre>
		<pre>{{ categories }}</pre>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tracks: useTracks(),
			currentCategory: "General",
		};
	},
	computed: {
		categories() {
			const out = this.tracks.map((t) => t.category);
			return [...new Set(out)];
		},
	},
	methods: {
		setCategory(to) {
			console.log(to);
		},
	},
	mounted() {},
};
</script>

<style lang="scss">
@import "./assets/base";
@import "./assets/theme";

#global {
	button {
		background: green;
	}
}
</style>
