import { initializeApp } from "firebase/app";
import { initUser } from "../composables/useFirebase";

export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();

	const firebaseConfig = {
		apiKey: config.public.firebaseApiKey,
		authDomain: "lekevoid-rpg-music.firebaseapp.com",
		projectId: "lekevoid-rpg-music",
		storageBucket: "lekevoid-rpg-music.appspot.com",
		messagingSenderId: "43870820376",
		appId: "1:43870820376:web:8f12f7f6855477b6680b6d",
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	initUser();
});
