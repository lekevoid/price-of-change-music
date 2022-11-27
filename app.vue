<template>
	<div id="global" :class="[currentCategory, { mounted }]">
		<div class="tabs">
			<div
				v-for="category in availableCategories"
				:key="category.id"
				:class="['tab', category.id, { active: currentCategory === category.id }]"
				@click="setCategory(category.id)"
			>
				<img :src="category.icon" height="50" width="50" />
			</div>
		</div>
		<main>
			<div class="inner">
				<section v-for="category in availableCategories" :key="category.id" :class="[category.id, { active: currentCategory === category.id }]">
					<h2>{{ category.label }}</h2>
					<div class="list">
						<div class="subcategory" v-for="subcategory in subcategories[currentCategory]">
							<h3>{{ subcategory }}</h3>
							<div
								v-for="track in orderedTracks[category.id][subcategory]"
								:class="['track', { active: currentTrack.id === track.id }]"
								@click="playTrack(track.id)"
								:key="track.id"
							>
								<div class="bg">
									<div class="normal"></div>
									<div class="hover"></div>
									<div class="active"></div>
								</div>
								<span class="label">{{ track.label }}</span>
								<span v-if="category.id === 'ambience'" :class="`intensity int_${track.intensity}`">{{ track.intensity }}</span>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
		<div class="player">
			<div class="track_title">{{ currentTrack.title }}</div>
			<audio :src="currentTrack.filepath" autoplay="autoplay" controls="controls" loop="loop" />
		</div>
	</div>
</template>

<script>
import icon_themes from "~/assets/img/category_themes.png";
import icon_ambience from "~/assets/img/category_ambience.png";
import icon_characters from "~/assets/img/category_characters.png";
import icon_locations from "~/assets/img/category_locations.png";
import icon_action from "~/assets/img/category_action.png";

export default {
	data() {
		return {
			tracks: useTracks(),
			currentTrack: { id: "", title: "", filepath: "" },
			currentCategory: "ambience",
			icons: {
				themes: icon_themes,
				ambience: icon_ambience,
				characters: icon_characters,
				locations: icon_locations,
				action: icon_action,
			},
			availableCategories: {},
			mounted: false,
		};
	},
	computed: {
		categories() {
			const out = this.tracks.map((t) => t.category);
			return [...new Set(out)];
		},
		subcategories() {
			const out = {};

			for (const track of this.tracks) {
				const { category, subcategory } = track;

				if (typeof out[category] === "undefined") {
					out[category] = [];
				}

				if (!out[category].includes(subcategory)) {
					out[category].push(subcategory);
				}
			}

			return out;
		},
		orderedTracks() {
			let out = {};
			for (const track of this.tracks) {
				const { category, subcategory } = track;

				if (typeof out[category] === "undefined") {
					out[category] = {};
				}

				if (typeof out[category][subcategory] === "undefined") {
					out[category][subcategory] = [];
				}

				out[category][subcategory].push(track);
			}

			return out;
		},
	},
	methods: {
		setCategory(to) {
			this.currentCategory = to;
		},
		getAvailableCategories() {
			if (this.categories) {
				this.availableCategories = ["themes", "ambience", "characters", "locations", "action"]
					.map((c) => {
						if (this.categories.includes(c)) {
							return { id: c, label: c, icon: this.icons[c] };
						}
						return null;
					})
					.filter(Boolean);
			}
		},
		playTrack(id) {
			const track = this.tracks.find((t) => t.id === id);
			this.currentTrack = { id: track.id, title: track.title, filepath: track.filepath };
		},
	},
	mounted() {
		this.getAvailableCategories();
		this.mounted = true;
	},
};
</script>

<style lang="scss">
@import "./assets/styles/base";
@import "./assets/styles/theme";
@import "./assets/styles/view";
</style>
