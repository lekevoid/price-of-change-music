<template>
	<div id="global" :class="[currentCategory, 'mounted']">
		<div class="tabs">
			<div
				v-for="category in categories"
				:key="category"
				:class="['tab', category.toLowerCase(), { active: isMounted && currentCategory === category }]"
				@click="setCategory(category)"
				@dblclick="toggleLabelMode()"
			>
				<img :src="icons[category]" height="50" width="50" />
				<div class="label">{{ category }}</div>
			</div>
		</div>
		<main>
			<div class="inner">
				<div class="list" v-if="isMounted">
					<section v-for="(tracks, subcategory) in sortedTracks[currentCategory]" :key="subcategory">
						<div class="subcategory">
							<h3>{{ subcategory }}</h3>
							<div
								v-for="track in tracks"
								:class="['track', { active: currentTrack.filename === track.filename }]"
								@click="playTrack(track.filename)"
								:key="track.filename"
							>
								<div class="bg">
									<div class="normal"></div>
									<div class="hover"></div>
									<div class="active"></div>
								</div>
								<span class="label" v-if="labelMode === 'title'">{{ track.title }}</span>
								<span class="label" v-if="labelMode === 'label'">{{ track.label }}</span>
								<span v-if="currentCategory === 'Ambience'" :class="`intensity int_${track.intensity}`">{{ track.intensity }}</span>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
		<div class="player">
			<div class="track_title">{{ currentTrack.title }}</div>
			<audio :src="currentTrack.filepath" autoplay="autoplay" controls="controls" loop="loop" />
		</div>
	</div>
</template>

<script setup>
import icon_themes from "~/assets/img/category_themes.png";
import icon_ambience from "~/assets/img/category_ambience.png";
import icon_characters from "~/assets/img/category_characters.png";
import icon_locations from "~/assets/img/category_locations.png";
import icon_action from "~/assets/img/category_action.png";

import action from "/assets/data/tracks_action.json";
import ambience from "/assets/data/tracks_ambience.json";
import characters from "/assets/data/tracks_characters.json";
import locations from "/assets/data/tracks_locations.json";
import themes from "/assets/data/tracks_themes.json";

const icons = { Themes: icon_themes, Ambience: icon_ambience, Characters: icon_characters, Locations: icon_locations, Action: icon_action };
const isMounted = ref(false);
const tracks = ref([...action, ...ambience, ...characters, ...locations, ...themes]);

const categories = computed(() => {
	return Array.from(new Set(tracks.value.map((t) => t.category))).sort();
});

/* const subcategories = computed(() => {
	const subcategoriesMapping = [];

	tracks.value.forEach((track) => {
		const subcategoryExists = subcategoriesMapping.some((s) => s.parent === track.category && s.name === track.subcategory);
		if (!subcategoryExists) {
			subcategoriesMapping.push({ parent: track.category, name: track.subcategory });
		}
	});

	console.log(subcategoriesMapping);
	return subcategoriesMapping;
}); */

const sortedTracks = computed(() => {
	function sortBySubcategory(a, b) {
		if (a.subcategory > b.subcategory) {
			return 1;
		} else if (a.subcategory < b.subcategory) {
			return -1;
		}
		return 0;
	}

	function sortByLabel(a, b) {
		if (a.label > b.label) {
			return 1;
		} else if (a.label < b.label) {
			return -1;
		}
		return 0;
	}

	let out = {};

	const _sortedTracks = tracks.value.sort(sortByLabel).sort(sortBySubcategory);

	_sortedTracks.forEach((track) => {
		const { category, subcategory } = track;

		if (!out[category]) {
			out[category] = {};
		}

		if (!out[category][subcategory]) {
			out[category][subcategory] = [];
		}

		if (!track.label || track.label === "Label") {
			track.label = track.title;
		}
		out[category][subcategory].push({ ...track });
	});

	return out;
});

console.log(sortedTracks.value);

const currentCategory = ref("Ambience");

const labelMode = "label";

function toggleLabelMode() {
	if (labelMode.value === "label") {
		labelMode.value = "title";
	} else {
		labelMode.value = "label";
	}
}

const currentTrack = ref({ id: "", title: "", filepath: "" });

function playTrack(filename) {
	const track = tracks.value.find((t) => t.filename === filename);
	this.currentTrack = { title: track.title, filepath: `/music/${track.filename}.mp3` };
}

function setCategory(to) {
	currentCategory.value = to;
}

onMounted(() => {
	isMounted.value = true;
});
</script>

<style lang="scss">
@import "~/assets/styles/view";
</style>
