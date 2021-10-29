
import { register } from 'register-service-worker'
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyDoBOvQnZe4DQKihqHCPd5zqKae2V2yfjI",
  authDomain: "fir-notification-534b6.firebaseapp.com",
  projectId: "fir-notification-534b6",
  storageBucket: "fir-notification-534b6.appspot.com",
  messagingSenderId: "87342348441",
}; // 4. Get Firebase Configuration
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BI4mI3QCD_v8r2i7aaPq1Q5JYXWNJ1XdP1jQAD-W9JGPb0l72wbtNlXHi04I7vCsmRcZBEDQHb5iEvcjD_YtAXE");

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
});

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}firebase-messaging-sw.js`, {
    ready (registration) {
      console.log('Firebase cloude messaging service enabled');
      messaging.requestPermission().then(() => {
        console.log('Notification permission granted.');
        // registration.showNotification('Vibration Sample', {
        //   body: 'Buzz! Buzz!',
        //   icon: '../images/touch/chrome-touch-icon-192x192.png',
        //   vibrate: [200, 100, 200, 100, 200, 100, 200],
        //   tag: 'vibration-sample'
        // });
        // Get Token
        messaging.getToken().then((token) => {
          console.log(token)
        })
      }).catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function () {
//     navigator.serviceWorker.register(`${process.env.BASE_URL}firebase-messaging-sw.js`).then(serviceWorkerRegistration => {
//       window.sw = serviceWorkerRegistration;
//       console.log('serviceWorkerRegistration:', serviceWorkerRegistration);
//       navigator.serviceWorker.ready.then(registration => {
//         console.log('registration:', registration);
//         var options = {
//           userVisibleOnly: true,
//           applicationServerKey: 'BI4mI3QCD_v8r2i7aaPq1Q5JYXWNJ1XdP1jQAD-W9JGPb0l72wbtNlXHi04I7vCsmRcZBEDQHb5iEvcjD_YtAXE'
//         };
//         serviceWorkerRegistration.pushManager.subscribe(options).then(data => {
//           console.log('data:', data);
//           serviceWorkerRegistration.pushManager.getSubscription().then(subscription => {
//             // You have subscription.
//             // Send data to service worker
//             console.log('subscription:', subscription);
//             console.log('active worker:', serviceWorkerRegistration.active);
//             messaging.getToken().then((token) => {
//               console.log('token: ', token)
//             })
//             serviceWorkerRegistration.showNotification('Vibration Sample', {
//               body: 'Buzz! Buzz!',
//               icon: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/05/18/974694-abd.jpg',
//               vibrate: [200, 100, 200, 100, 200, 100, 200],
//               tag: 'vibration-sample'
//             });
//           });
//         });
//       });
//     });
//   })
// }