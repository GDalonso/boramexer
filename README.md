## Demo

https://react-firebase-login-template.web.app

## How to use?

1. Install dependencies.

```js
npm install
// or
yarn install
```

2. Go to the [Firebase Console](https://console.firebase.google.com/), 
2.1. Create a project
2.2. Create a web app, 
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
2.3. Create a realtime database, add the uri as the databaseURL key to the configs
![database url](s3://hackultura/Public/boramexer_screenshots/2.png)
2.4. Go the the authentication menu and enable "email/password" authentication
![authentication_email_password](s3://hackultura/Public/boramexer_screenshots/3.png)


4. Run project on iOS / Android.

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

## Support

In case of any questions or problems, please contact me at:
[hello@reactnativemarket.com](mailto:hello@reactnativemarket.com)

### Happy Coding 🚀

### [ReactNativeMarket.com](http://reactnativemarket.com/)
