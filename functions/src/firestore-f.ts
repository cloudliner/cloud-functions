import * as functions from 'firebase-functions';

export class FirestoreFunctions {
  createUser = functions.firestore.document('users/{userId}')
      .onCreate(event => {
        const newValue = event.data.data();
        const name  = newValue.name;
        console.log(name);
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
              resolve('createUser');
          }, 0);
        });
      });
}
