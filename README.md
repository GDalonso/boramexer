## Demo

Web app url coming soon

## This project uses:
 - React native to create the app with JS
 - Expo to manage the mobile compilation
 - Firebase auth as a authentication provider
 - Firebase Firestore as a nosql database

## How to use?

1. Install dependencies.

```js
npm install
// or
yarn install
```

2. Go to the [Firebase Console](https://console.firebase.google.com/),
 - Create a project
 -  Create a web app, 
![Create a web app](https://hackultura.s3.amazonaws.com/Public/boramexer_screenshots/1.png)
get the credentials, replace `FIREBASE_CONFIG` on `src/core/config.js`
```js
export const FIREBASE_CONFIG = {
  apiKey: 'ASD4546ASDAFdfdsf',
  authDomain: 'projeto-AAAA.firebaseapp.com',
  projectId: 'projeto-AAAA',
  storageBucket: 'projeto.appspot.com',
  messagingSenderId: '56465465454',
  appId: '65a4564sdadas',
  measurementId: 'asdasd',
  databaseURL: 'SEE NEXT STEP',
}
```
  - Create a realtime database, add the uri as the databaseURL key to the configs
![database url](https://hackultura.s3.amazonaws.com/Public/boramexer_screenshots/2.png)
  - Go the the authentication menu and enable "email/password" authentication
![authentication_email_password](https://hackultura.s3.amazonaws.com/Public/boramexer_screenshots/3.png)
  - Create a firestore database, keep it closed, then go into the rules tab and paste the rule from `FirebaseSecurityRule`
  ![Rules tab](https://hackultura.s3.amazonaws.com/Public/boramexer_screenshots/4.png)

3. Run project on iOS / Android.

```js
 npm run ios // npm run android
 // or
 yarn ios // yarn android
```

## Preview

![homescreen](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-login-template/homescreen.png)
![login](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-login-template/login.png)
![register](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-login-template/register.png)
![forgot](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-login-template/forgot.png)
![dashboard](https://raw.githubusercontent.com/venits/react-native-market/master/assets/firebase-login-template/dashboard.png)

manual build 
eas build -p android

run locally in debug
npx expo start --tunnel

eas submit -p android