import { store } from '../firebaseService';

const collection = store.collection('peaches');

export class Peach {
	constructor({ uid, title = '', description = '', likes = [], links = [] }) {
		Object.assign(this, {
			title,
			description,
			likes,
			links,
			created: Date.now()
		});
		if (!uid) {
			collection
				.add({ ...this })
				.then(({ id }) => Object.assign(this, { uid: id }));
		}
	}
	delete() {
		return collection.doc(this.uid).delete();
	}
	save() {
		if (!this.uid) console.error('not ready yet #DEBUG');
		const { uid, title, description, likes, links, created } = this;
		return collection
			.doc(uid)
			.set({ title, description, likes, links, created });
	}
}

export const findAll = () => {
	return collection.get().then(peachesSnapshot => {
		const peaches = [];
		peachesSnapshot.forEach(doc =>
			peaches.push(new Peach({ ...doc.data(), uid: doc.id }))
		);
		return peaches;
	});
};

export default Peach;
