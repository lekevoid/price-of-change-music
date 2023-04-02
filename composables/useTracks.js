import action from "/assets/data/tracks_action.json";
import ambience from "/assets/data/tracks_locations.json";
import characters from "/assets/data/tracks_characters.json";
import locations from "/assets/data/tracks_locations.json";
import themes from "/assets/data/tracks_themes.json";

export default function useTracks() {
	console.log(action);
	return useState("tracks", () => ({
		action: action,
		ambience: ambience,
		characters: characters,
		locations: locations,
		themes: themes,
	}));

	function replaceChars(str) {
		return str.replace(/_s/g, "'s").replace(/_ /g, ", ");
	}

	/* const data = Object.values(tracks).map((t) => {
		const track = decodeURI(t.default);
		const parts = track.match(/\([^)]+\)/g);
		const category = replaceChars(parts[0].replace(/[()]/g, "").toLowerCase());
		const subcategory = replaceChars(parts[1].replace(/[()]/g, "").toLowerCase());
		let label = replaceChars(parts[2].replace(/[()]/g, ""));
		const title = replaceChars(parts[3].replace(/[()]/g, ""));
		const intensity = parts?.[4]?.replace(/[()]/g, "") || "";

		if (label === "Label") {
			label = title;
		}

		const id = `${title + label}`.toLowerCase().replace(/[^\w]+/g, "");

		const out = { filepath: track, id, title, label, category, subcategory, intensity };
		return out;
	}); */

	return tracks;
}
