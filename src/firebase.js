console.log('starting firebase...');
var firebase = require('firebase/app');
import 'firebase/messaging';
let fcmKey = 'XXXXX';
let firebaseConfig = {
    apiKey: "XXXX",
    authDomain: "XXXX",
    projectId: "XXXX",
    storageBucket: "XXXX",
    messagingSenderId: "XXXX"
};
// Initialize Firebase App Instance
var app = {};
var messaging = null;
if (firebase.apps.length === 0 && checkForFCMSupport(firebase)) {
    app = firebase.initializeApp(firebaseConfig);
    console.log('app:', app);
    // Retrieve Firebase Messaging object.
    messaging = app.messaging();
    // Add the public key generated from the console here.
    messaging.usePublicVapidKey(fcmKey);

    // request permission for notification and get token on success
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            // Get Instance ID token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            messaging
                .getToken()
                .then(currentToken => {
                    if (currentToken) {
                        console.log('currentToken : ', currentToken);
                    } else {
                        // Show permission request.
                        console.log('No Instance ID token available. Request permission to generate one.');
                    }
                })
                .catch(err => {
                    console.log('An error occurred while retrieving token. ', err);
                });
        } else {
            console.log('Unable to get permission to notify.');
        }
    });

    // // Callback fired if Instance ID token is updated.
    // messaging.onTokenRefresh(() => {
    //     messaging
    //         .getToken()
    //         .then(refreshedToken => {
    //             console.log('Token refreshed : ', refreshedToken );
    //             // // Indicate that the new Instance ID token has not yet been sent to the app server.
    //             // setTokenSentToServer(false);
    //             // // Send Instance ID token to app server.
    //             // sendTokenToServer(refreshedToken);
    //         })
    //         .catch(err => {
    //             // showToken('Unable to retrieve refreshed token ', err);
    //             console.log('Unable to retrieve refreshed token ', err);
    //         });
    // });


    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    // `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage(payload => {
        console.log('Message received foreground:', payload);
        // Customize notification here
        const notificationData = payload.notification;
        const notificationTitle = notificationData.title;
        const notificationOptions = {
            body: notificationData.body,
            icon: notificationData.icon,
            data: {
                linkToOpen: payload.fcmOptions ? payload.fcmOptions.link : ''
            }
        };
        navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js').then(registration => {
            console.log('registration:');
            registration.showNotification(
                notificationTitle,
                notificationOptions
            );
        })
    });
}
// function setTokenSentToServer(sent) {
//     window.localStorage.setItem('sentToServer', sent ? '1' : '0');
// }
// function isTokenSentToServer() {
//     return window.localStorage.getItem('sentToServer') === '1';
// }
// function sendTokenToServer(currentToken) {
//     console.log('CURRENT_TOKEN:', currentToken);
//     localStorage.setItem('currentToken', currentToken);
//     if (!isTokenSentToServer()) {
//         console.log('Sending token to server...');
//         store.dispatch('SEND_FCM_TOKEN_TO_SERVER', {
//             payload: { registrationToken: currentToken },
//             pathVariables: { memberId: getMemberID() },
//             success: () => {
//                 setTokenSentToServer(true);
//             }
//         }, { root: true });
//     } else {
//         console.log("Token already sent to server so won't send it again unless it changes");
//     }
// }
// global.deleteUserToken = function () {
//     const token = localStorage.getItem('currentToken');
//     messaging.deleteToken(token).then(data => {
//         console.log('TOKEN_DELETED:', data)
//     });
// };
// global.askForNotificationPermissionAndGetToken = function () {
//     Notification.requestPermission().then(permission => {
//         if (permission === 'granted') {
//             console.log('Notification permission granted.');
//             // Get Instance ID token. Initially this makes a network call, once retrieved
//             // subsequent calls to getToken will return from cache.
//             messaging
//                 .getToken()
//                 .then(currentToken => {
//                     if (currentToken) {
//                         sendTokenToServer(currentToken);
//                         updateUIForPushEnabled(currentToken);
//                     } else {
//                         // Show permission request.
//                         console.log('No Instance ID token available. Request permission to generate one.');
//                         // Show permission UI.
//                         updateUIForPushPermissionRequired();
//                         setTokenSentToServer(false);
//                     }
//                 })
//                 .catch(err => {
//                     console.log('An error occurred while retrieving token. ', err);
//                     // showToken('Error retrieving Instance ID token. ', err);
//                     setTokenSentToServer(false);
//                 });
//         } else {
//             console.log('Unable to get permission to notify.');
//         }
//     });
// };
// function updateUIForPushEnabled() {
//     console.log('updateUIForPushEnabled');
// }
// function updateUIForPushPermissionRequired() {
//     console.log('updateUIForPushPermissionRequired');
// }
function checkForFCMSupport(firebase) {
    return firebase.messaging && firebase.messaging.isSupported();
}
