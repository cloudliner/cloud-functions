import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const addMessage = functions.https.onRequest((req, res) => {
  const original = req.query.text;
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    res.redirect(303, snapshot.ref);
  });
});

export const makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite((event) => {
  const original = event.data.val();
  console.log('Uppercasing', event.params.pushId, original);
  const uppercase = original.toUpperCase();
  return event.data.ref.parent.child('uppercase').set(uppercase);
});

import { FirestoreFunctions } from './firestore-f';
const firestoreFunctions = new FirestoreFunctions();

export const createUser = firestoreFunctions.createUser;
