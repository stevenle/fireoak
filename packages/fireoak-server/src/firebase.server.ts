import * as firebase from 'firebase-admin';
import serviceAccount from '../service-account.json';

export function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert({
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id,
      }),
      databaseURL: `https://${process.env.PROJECT_ID}-default-rtdb.firebaseio.com`,
    })
  }
  return firebase.apps[0]!;
}
