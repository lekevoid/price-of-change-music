import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const signIn = async (email, password) => {
	const auth = getAuth();
	console.log(auth);
	const credentials = await signInWithEmailAndPassword(auth, email, password).catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
	});
	return credentials;
};

export const signOut = async () => {
	const auth = getAuth();
	await auth.signOut();
};

export const initUser = async () => {
	const auth = getAuth();
	onAuthStateChanged(auth, (user) => {
		if (user) {
			const uid = user.uid;
			console.log(uid);
		} else {
		}
	});
};
