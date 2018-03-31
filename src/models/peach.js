import { store } from '../firebaseService';

const collection = store.collection('peaches');

export class Peach {
	constructor({
		id,
		title = '',
		description = '',
		likes = [],
		links = [],
		author
	}) {
		const doc = id ? collection.doc(id) : collection.doc();
		Object.assign(this, {
			doc,
			id: id || doc.id,
			title,
			description,
			likes,
			links,
			author,
			created: new Date()
		});
	}

	delete = () => this.doc.delete();

	save = () => this.doc.set(this.toStorable());

	toStorable = () => ({
		title: this.title,
		description: this.description,
		likes: this.likes,
		links: this.links,
		created: this.created,
		author: this.author
	});
}

export const findAll = () => {
	return collection.get().then(peachesSnapshot => {
		const peaches = [];
		peachesSnapshot.forEach(doc =>
			peaches.push(new Peach({ ...doc.data(), id: doc.id }))
		);
		return peaches;
	});
};

export default Peach;
