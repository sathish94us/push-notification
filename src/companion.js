(function () {
    'use strict';
    // var workerScript = document.currentScript.dataset.serviceWorker;
    // adapted from create-react-app script
    let senderID = 'XXXX';
    let fcmKey = 'XXXX';
    let firebaseConfig = {
        apiKey: "XXXX",
        authDomain: "XXXX",
        projectId: "XXXX",
        storageBucket: "XXXX",
        messagingSenderId: "XXXX"
    };
    let registration = null;
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' }).then(serviceWorkerRegistration => {
                registration = serviceWorkerRegistration;
                console.log('serviceWorkerRegistration:', serviceWorkerRegistration);
                navigator.serviceWorker.ready.then(registration => {
                    console.log('registration:', registration);
                    var options = {
                        userVisibleOnly: true,
                        applicationServerKey: fcmKey
                    };
                    serviceWorkerRegistration.pushManager.subscribe(options).then(data => {
                        console.log('data:', data);
                        serviceWorkerRegistration.pushManager.getSubscription().then(subscription => {
                            // You have subscription.
                            // Send data to service worker
                            console.log('subscription:', subscription);
                            console.log('active worker:', serviceWorkerRegistration.active);
                            if (serviceWorkerRegistration.active !== null) {
                                serviceWorkerRegistration.active.postMessage({
                                    'senderId': senderID,
                                    'firebaseConfig': firebaseConfig
                                });
                            }
                        });
                    });
                });
            });
            // navigator.serviceWorker.register('/serviceworker.js', { scope: '/home' }).then(swRegistration => {
            //     console.log('swRegistration:', swRegistration)
            // });
            if (navigator && navigator.serviceWorker) {
                console.log('ADD ON MESSAGE LISTENER.....');
                navigator.serviceWorker.onmessage = function (event) {
                    console.log('EVENT:', event);
                    const options = {
                        body: 'push body',
                        icon: 'https://res.cloudinary.com/practicaldev/image/fetch/s--JXNG2lTR--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j7pq4z4irccx3bdrc24v.jpeg',
                        image: './img/AKP.png',
                        vibrate: [200, 100, 200, 100, 200, 100, 200],
                        tag: 'vibration-sample'
                    }
                    if(registration) {
                        registration.showNotification('my notification', options)
                    }
                    else {
                        navigator.serviceWorker.getRegistration().then(function (registration) {
                            registration.showNotification('my notification', options)
                        })
                    }
                    if (event.data && event.data.type === 'CUSTOM_EVENT') {
                        console.log('will_open_this_link:', event.data.linkTo);
                        window.open(event.data.linkTo);
                    }
                };
            }
        })
    }
})();
