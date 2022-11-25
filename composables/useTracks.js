export default function useTracks() {
	const tracks = import.meta.glob("/assets/music/*", { eager: true });

	const data = Object.values(tracks).map((t) => {
		const track = t.default;
		const title = track.match(/;(.+);/)?.[1];
		const label = track.match(/!(.+)!/)?.[1];
		const category = track.match(/\((.+)\)/)?.[1];
		const subcategory = track.match(/\[(.+)\]/)?.[1];
		const intensity = track.match(/\{(\d+)\}/)?.[1];

		return { filepath: track, title, label, category, subcategory, intensity };
	});

	return data;
}
