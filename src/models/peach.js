import { store } from "../firebaseService";

const collection = store.collection("users");

export class Peach {
  constructor({ title, description, likes, creationDate, links }) {
    Object.assign(this, {
      title,
      description,
      likes,
      creationDate,
      links
    });
  }
  update() {
    const { uid, title, description, likes, creationDate, links } = this;
    return collection
      .doc(uid)
      .set({ title, description, likes, creationDate, links }, { merge: true });
  }
  remove() {
    return collection.doc(this.uid).delete();
  }
  save() {
    const { title, description, likes, creationDate } = this;
    return collection
      .add({ title, description, likes, creationDate })
      .then(({ id }) => !this.uid && Object.assign(this, { uid: id }));
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
