const webPush = require('web-push');

// Replace these with your VAPID keys generated earlier
const vapidKeys = {
    publicKey: 'BHDuC_rmp06Uv8P6HypJ63TLqkFTXqHT2ldA-hDdda88K9f5DpSQPXzdmS4XDZjGSnKQrEhC7KEz_Ax2ohkFrWE',
    privateKey: 'A1XKINuohQrJJjAaij4AqtyKra21sZDQtkmDu_Es75s'
};

webPush.setVapidDetails(
    'mailto:your-email@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// Subscription object you got from the client (replace with actual values)
const pushSubscription = {
    endpoint: "https://wns2-pn1p.notify.windows.com/w/?token=BQYAAABVaULh%2bW4FsQ0hsz01XIhFVpdwvzE%2fJJ5vfZwWFTMR9%2fYsoJTkD2ytxjZtz2utt17K3Cus%2fykDavPLt2hK2EFIddnNq5msB8xAxqFSFLu8BWek8UG5FNms0mTjQeYlGX5NoKNnR%2fyNEh%2fQ2URLDoPCC%2bq519dbGjm3SSM79MfP458l%2fq3i9qIQPoBBP1R%2f%2bSTlvMQvn2Ok210GgmyDuGbmn6v3jktVqc7NDBw5VWvx9VPdeZX1dkMnpy0HiIgFl%2fGcuYLJCZGo4oNS9xCQ9P2UNGEbXthbT2wn%2fgvPX%2bg%2bvb4zzcloQ1lfqSS0K2rqUnTk4ELeNtQ8WS4JocstqFf9",
    keys: {
        p256dh: 'BKPOyXG53FE5iQAb9ls48KVP6XviiPODA4hvkfWVgWI6kz5nchaB5q4Yk7bGBxpodKG074oU8qcuyfrQYIum9R4',
        auth: '2XhxdMwsXwqyf7l4gfPuRQ'
    }
};

// Notification payload
const payload = JSON.stringify({
    title: 'Push Notification Title',
    body: 'This is the body of the push notification.',
    icon: 'icons/icon-192x192.png'
});

// Options (Optional)
const options = {
    TTL: 60 // Time-to-live in seconds
};

// Send Notification
webPush.sendNotification(pushSubscription, payload, options)
    .then(response => {
        console.log('Notification sent successfully:', response);
    })
    .catch(error => {
        console.error('Error sending notification:', error);
    });
