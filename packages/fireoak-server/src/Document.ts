import {initFirebase} from './firebase.server';
import {App} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

export class Document<T> {
  site: string;
  collection: string;
  slug: string;
  firebase: App;

  constructor(docId: string) {
    const [site, collection, slug] = docId.split('/');
    this.site = site;
    this.collection = collection;
    this.slug = slug;
    this.firebase = initFirebase();
  }

  async getData({env}: {env?: 'staging' | 'prod'}): Promise<T | null> {
    if (!env) {
      env = 'prod';
    }

    const firestore = getFirestore(this.firebase);
    const docRef = firestore.doc(`sites/${this.site}/collections/${this.collection}/docs/${this.slug}/data/${env}`);
    const snapshot = await docRef.get();
    if (snapshot.exists) {
      return snapshot.data() as T;
    }
    return null;
  }
}
