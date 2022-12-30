export default function useTracks() {
	const tracks = import.meta.glob("/assets/music/*", { eager: true });

	function replaceChars(str) {
		return str.replace(/_s/g, "'s").replace(/_ /g, ", ");
	}

	const data = Object.values(tracks).map((t) => {
		const track = decodeURI(t.default);
		const parts = track.match(/\([^)]+\)/g);
		const category = parts[0].replace(/[()]/g, "").toLowerCase();
		const subcategory = parts[1].replace(/[()]/g, "").toLowerCase();
		let label = replaceChars(parts[2].replace(/[()]/g, ""));
		const title = parts[3].replace(/[()]/g, "");
		const intensity = parts?.[4]?.replace(/[()]/g, "") || "";

		if (label === "Label") {
			label = replaceChars(title);
		}

		const id = `${title + label}`.toLowerCase().replace(/[^\w]+/g, "");

		const out = { filepath: track, id, title, label, category, subcategory, intensity };
		return out;
	});

	return data;
}
