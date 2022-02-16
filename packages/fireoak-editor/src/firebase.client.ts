import {initializeApp, getApps} from 'firebase/app';

const CONFIG = {
  apiKey: 'AIzaSyAdewPx6VCeIU6ZUEsTPM0RJgAapwB5ff4',
  authDomain: 'steveobot-oak.firebaseapp.com',
  databaseURL: 'https://steveobot-oak-default-rtdb.firebaseio.com',
  projectId: 'steveobot-oak',
  storageBucket: 'steveobot-oak.appspot.com',
  messagingSenderId: '611721172123',
  appId: '1:611721172123:web:6d6834ff21d4b863f5623e',
  measurementId: 'G-TMPQN23EMH',
};

export function initFirebase() {
  if (typeof window !== 'undefined' && !getApps().length) {
    initializeApp(CONFIG);
  }
  return getApps()[0]!;
}
