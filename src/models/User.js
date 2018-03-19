import { store } from '../firebaseService';

const collection = store.collection('users');

export class User {
	constructor({ uid, displayName, photoURL, email }) {
		Object.assign(this, { uid, displayName, photoURL, email });
		collection
			.doc(uid)
			.get()
			.then(doc => !doc.exists && this.save)
			.catch(error => {
				throw error;
			});
	}
	getAcronym = () =>
		this.displayName
			.split(' ')
			.slice(0, 2)
			.map(full => full.charAt(0).toUpperCase())
			.join('');

	save() {
		const { displayName, photoURL, email } = this;
		collection.doc(this.uid).set({ displayName, photoURL, email });
	}
}

export default User;
