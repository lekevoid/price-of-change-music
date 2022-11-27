export default function useTracks() {
	const tracks = import.meta.glob("/assets/music/*", { eager: true });

	const data = Object.values(tracks).map((t) => {
		const track = t.default;
		const title = track.match(/;(.+);/)?.[1];
		const category = track.match(/\((.+)\)/)?.[1];
		const subcategory = track.match(/\[(.+)\]/)?.[1];
		const intensity = track.match(/\{(\d+)\}/)?.[1];
		let label = track.match(/!(.+)!/)?.[1];

		if (label === "Label") {
			label = title;
		}

		const id = (title.replace(/[^\w]+/g, "") + label.replace(/[^\w]+/g, "")).toLowerCase();

		return { filepath: track, id, title, label, category: category.toLowerCase(), subcategory: subcategory.toLowerCase(), intensity };
	});

	return data;
}
