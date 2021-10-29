
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js')

self.__precacheManifest = [].concat(self.__precacheManifest || [])

workbox.setConfig({
    debug: true
});

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

let clickOpenUrl;

self.addEventListener('push', event => {
    let pushMessage = event.data.text();
    clickOpenUrl = 'https://google.com';
    const options = {
        body: pushMessage,
        icon: './img/icons/android-chrome-192x192.png',
        image: './img/AKP.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
    }
    event.waitUntil(self.registration.showNotification('my notification', options))
})

workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    workbox.strategies.cacheFirst({
        cacheName: 'googleapis',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30
            })
        ],
        method: 'GET',
        cacheableRespoonse: {
            statuses: [0, 200]
        }
    })
);

workbox.routing.registerRoute(
    new RegExp("https://jsonplaceholder.typicode.com/(.*)"),
    workbox.strategies.networkFirst({
        cacheName: 'axiosPosts',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 30
            })
        ],
        method: 'GET',
        cacheableRespoonse: {
            statuses: [0, 200]
        }
    })
);

self.addEventListener('notificationclick', event => {
    const clickedNotification = event.notification;
    clickedNotification.close();
    if(clickOpenUrl) {
        const prmoiseChain = clients.openWindow(clickOpenUrl)
        event.waitUntil(prmoiseChain);
    }
})

// var was_questioned = false;
// if (Notification.permission == 'default') {
//     was_questioned = true;
// }

// Notification.requestPermission(function (permission) {
//     if (was_questioned) {
//         console.log("User was asked. New permission is: " + permission);
//     }
//     if ('permissions' in navigator) {
//     navigator.permissions.query({name:'notifications'}).then(function(notificationPerm) {
//         notificationPerm.onchange = function() {
//             console.log("User decided to change his seettings. New permission: " + notificationPerm.state);
//         };
//     });
//     }
// });