import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useFirebaseUser } from "./useState";

export const signIn = async (email, password) => {
	const auth = getAuth();
	const credentials = await signInWithEmailAndPassword(auth, email, password);
	return credentials;
};

export const signOut = async () => {
	const auth = getAuth();
	await auth.signOut();
};

export const initUser = async () => {
	const auth = getAuth();
	const firebaseUser = useFirebaseUser();
	firebaseUser.value = auth.currentUser;

	onAuthStateChanged(auth, (user) => {
		firebaseUser.value = user;
	});
};
