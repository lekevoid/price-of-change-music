// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	runtimeConfig: {
		firebaseApiKey: process.env.FIREBASE_API_KEY,
		public: {
			firebaseApiKey: process.env.FIREBASE_PUBLIC_API_KEY,
		},
	},
	modules: ["@kevinmarrec/nuxt-pwa"],
	app: {
		head: {
			charset: "utf-16",
			viewport: "width=1024, initial-scale=1",
			title: "The Price of Change",
			meta: [
				{ name: "description", content: "RPG music" },
				{ name: "robots", content: "noindex nofollow" },
			],
		},
	},
	pwa: {
		manifest: {
			name: "The Price of Change",
			short_name: "The Price of Change",
			background_color: "#000000",
			theme_color: "#AAAA00",
		},
	},
});
