// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/6.6.2/firebase-messaging.js');
// var SENDER_ID = 'CRC';
var CONFIGS = {
    apiKey: 'XXXXX',
    authDomain: 'XXXXX',
    databaseURL: 'XXXXX',
    projectId: 'XXXXX',
    storageBucket: 'XXXXX',
    messagingSenderId: 'XXXXX',
    appId: 'XXXXX',
    measurementId: 'XXXXX'
};
self.addEventListener('message', function (evt) {
    CONFIGS = evt.data.firebaseConfig;
    initializeFirebase();
});

function initializeFirebase() {
    // eslint-disable-next-line no-undef
    if (firebase.apps.length === 0) {
        // eslint-disable-next-line no-undef
        firebase.initializeApp(CONFIGS);
    }
}

initializeFirebase();

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    // Customize notification here
    const notificationTitle = payload.title;
    const notificationOptions = {
        body: payload.body,
        icon: payload.icon
    };
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});
// Notification click event listener
self.addEventListener('notificationclick', e => {
    // const prodUrl = 'https://mitra.blibli.com/notifications';
    const calculatedUrl = `${self.location.origin}/notifications`;
    const urlToOpen = (e.notification.data && e.notification.data.linkToOpen.length)
        ? e.notification.data.linkToOpen : calculatedUrl;
    // Close the notification popout
    e.notification.close();
    // eslint-disable-next-line no-undef
    const promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then((windowClients) => {
        let matchingClient = null;
        for (let i = 0; i < windowClients.length; i++) {
            const windowClient = windowClients[i];
            if (windowClient.url === urlToOpen) {
                matchingClient = windowClient;
                break;
            }
        }
        if (matchingClient) {
            // return matchingClient.focus();
            return matchingClient.postMessage({
                type: 'CUSTOM_EVENT',
                linkTo: urlToOpen
            })
        } else {
            //eslint-disable-next-line no-undef
            return windowClients[0].postMessage({
                type: 'CUSTOM_EVENT',
                linkTo: urlToOpen
            })
            // return clients.openWindow(urlToOpen).then(windowClient => {
            // console.log('windowClient:', windowClient);
            // });
        }
    });
    e.waitUntil(promiseChain);
});