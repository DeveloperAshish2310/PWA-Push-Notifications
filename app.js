// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(function(error) {
            console.error('Service Worker registration failed:', error);
        });
    });
}

const notificationButton = document.getElementById('enable-notifications');

// Request notification permission when the button is clicked
notificationButton.addEventListener('click', function() {
    Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
            subscribeUserToPush();
        } else {
            alert('Notification permission denied!');
        }
    });
});

// Function to subscribe the user to Push Notifications
function subscribeUserToPush() {
    navigator.serviceWorker.ready.then(function(registration) {
        const vapidPublicKey = 'BHDuC_rmp06Uv8P6HypJ63TLqkFTXqHT2ldA-hDdda88K9f5DpSQPXzdmS4XDZjGSnKQrEhC7KEz_Ax2ohkFrWE';  // Replace with your VAPID public key
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey
        }).then(function(subscription) {
            console.log('User is subscribed:', subscription);
            sendSubscriptionToServer(subscription);
        }).catch(function(error) {
            console.error('Failed to subscribe user:', error);
        });
    });
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Send subscription to the server
function sendSubscriptionToServer(subscription) {
    // Replace this with your backend server code to store subscription
    console.log('Subscription sent to server:', subscription);
}
