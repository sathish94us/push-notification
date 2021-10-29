// // Retrieve an instance of Firebase Messaging so that it can handle background messages.
// const messaging = firebase.messaging();

// messaging.onMessage((payload) => {
//     console.log('Message received. ', payload);
// });

// self.addEventListener('push', event => {
//     let pushMessage = null;
//     if(!event.data)
//         pushMessage = "No Payload";
//     else
//         pushMessage = event.data.text();
//     clickOpenUrl = 'http://127.0.0.1:8887/';
//     const options = {
//         body: pushMessage.body,
//         icon: 'https://res.cloudinary.com/practicaldev/image/fetch/s--JXNG2lTR--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j7pq4z4irccx3bdrc24v.jpeg',
//         image: './img/AKP.png',
//         vibrate: [200, 100, 200, 100, 200, 100, 200],
//         tag: 'vibration-sample'
//     }
//     event.waitUntil(self.registration.showNotification('my notification', options))
//     window.ws.showNotification('Vibration Sample', {
//         body: 'Buzz! Buzz!',
//         icon: 'https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/05/18/974694-abd.jpg',
//         vibrate: [200, 100, 200, 100, 200, 100, 200],
//         tag: 'vibration-sample'
//     });
//     // self.registration.showNotification('my notification', options)
// })

// self.addEventListener('notificationclick', event => {
//     const clickedNotification = event.notification;
//     clickedNotification.close();
//     if(clickOpenUrl) {
//         const prmoiseChain = clients.openWindow(clickOpenUrl)
//         event.waitUntil(prmoiseChain);
//     }
// })

// // messaging.setBackgroundMessageHandler(payload => {
// //     const title = payload.data.username;
// //     let iconPath = '';
// //     const options = {
// //         body: payload.data.message,
// //         icon: ''
// //     }
// //     return self.registration.showNotification(title, options);
// // });


// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// var SENDER_ID = 'CRC';
var CONFIGS = {
    apiKey: "AIzaSyDoBOvQnZe4DQKihqHCPd5zqKae2V2yfjI",
    authDomain: "fir-notification-534b6.firebaseapp.com",
    projectId: "fir-notification-534b6",
    storageBucket: "fir-notification-534b6.appspot.com",
    messagingSenderId: "87342348441",
    appId: "1:87342348441:web:7c21ed2eef5ca6c08de008",
    measurementId: "G-DBLPF4YSPW"
};

// self.addEventListener('message', function (evt) {
//   CONFIGS = evt.data.firebaseConfig;
// });

// eslint-disable-next-line no-undef
if (firebase.apps.length === 0) {
  // eslint-disable-next-line no-undef
  firebase.initializeApp(CONFIGS);
}

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

self.addEventListener('push', event => {
    // let pushMessage = null;
    // if(!event.data)
    //     pushMessage = "No Payload";
    // else
    //     pushMessage = event.data.text();
    clickOpenUrl = 'http://127.0.0.1:8887/';
    const options = {
        body: 'push body',
        icon: 'https://res.cloudinary.com/practicaldev/image/fetch/s--JXNG2lTR--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j7pq4z4irccx3bdrc24v.jpeg',
        image: './img/AKP.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
    }
    event.waitUntil(self.registration.showNotification('my notification', options))
})

messaging.setBackgroundMessageHandler(function(payload) {
  // Customize notification here
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: 'background body',
    icon: payload.icon
  };

  return self.registration.showNotification(
      notificationTitle,
      notificationOptions
  );
});