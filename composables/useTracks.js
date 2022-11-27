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

		let id = "";
		if (typeof title === "string" && typeof label === "string") {
			const start = (title + label).toLowerCase();
			console.log(start);
			id = start.replace(/[^\w]+/g, "");
		}

		return { filepath: track, id, title, label, category: category.toLowerCase(), subcategory: subcategory.toLowerCase(), intensity };
	});

	return data;
}
