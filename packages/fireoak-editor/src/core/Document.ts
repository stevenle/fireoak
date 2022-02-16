import {FirebaseApp} from 'firebase/app';
import {getFirestore, doc, getDoc} from 'firebase/firestore';

export class Document<T> {
  firebase: FirebaseApp;
  site: string;
  collection: string;
  slug: string;

  constructor(docId: string, {firebase}: {firebase: FirebaseApp}) {
    const [site, collection, slug] = docId.split('/');
    this.firebase = firebase;
    this.site = site;
    this.collection = collection;
    this.slug = slug;
  }

  async getData({env}: {env?: 'staging' | 'prod'}): Promise<T> {
    if (!env) {
      env = 'prod';
    }

    console.log('firebase:');
    console.log(this.firebase);
    const db = getFirestore(this.firebase);
    const docRef = doc(db, 'sites', this.site, 'collections', this.collection, 'docs', this.slug, 'data', env);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as T;
    }
    return {} as T;
  }
}
