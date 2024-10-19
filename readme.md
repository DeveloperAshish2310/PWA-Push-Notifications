# Progressive Web App (PWA) with Push Notifications

This project demonstrates how to build a simple Progressive Web App (PWA) using vanilla JavaScript that includes push notifications, even when the app is closed.

## Features
- Service worker registration
- Push notifications using Web Push Protocol
- Manifest file for PWA setup
- No external libraries (Vanilla JS)

---

## Requirements
1. **Node.js** (Download from [Node.js official site](https://nodejs.org))
2. **http-server** package to serve the app locally
3. **web-push** package for sending push notifications
4. Browser that supports service workers and push notifications (e.g., Chrome)

---

## Setup Instructions

### Step 1: Install Node.js
- Download and install Node.js from [here](https://nodejs.org).
- Verify the installation by running this command in your terminal or command prompt:
  ```bash
  node -v
  ```

### Step 2: Install `http-server`
- Install `http-server` globally to serve your static files:
  ```bash
  npm install -g http-server
  ```

### Step 3: Create Project Files
1. **Create a folder for the project:**
   ```bash
   mkdir my-pwa
   cd my-pwa
   ```

2. **Create the following files:**

- `index.html`: Main HTML page for the PWA
- `app.js`: JavaScript file to register the service worker and handle push notifications
- `service-worker.js`: Service worker script to handle background tasks
- `manifest.json`: Manifest file for the PWA
- `server.js`: Backend script to send push notifications using `web-push`

### Step 4: Install `web-push` for Notifications
- Initialize a Node.js project:
  ```bash
  npm init -y
  ```
- Install the `web-push` package:
  ```bash
  npm install web-push --save
  ```

### Step 5: Generate VAPID Keys
Generate VAPID keys (used for web push notifications):
```bash
npx web-push generate-vapid-keys
```
This will output a public and private key. Copy these keys and use them in `server.js`.

### Step 6: Add Code to Files

#### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My PWA</title>
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <h1>My PWA with Push Notifications</h1>
    <button id="enableNotifications">Enable Notifications</button>
    <script src="app.js"></script>
</body>
</html>
```

#### `app.js`
```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            console.log('Service Worker Registered');
        }).catch(function(err) {
            console.error('Service Worker Registration Failed:', err);
        });
}

// Button to enable notifications
const enableNotificationsButton = document.getElementById('enableNotifications');
enableNotificationsButton.addEventListener('click', () => {
    Notification.requestPermission().then(function(result) {
        if (result === 'granted') {
            subscribeUser();
        }
    });
});

function subscribeUser() {
    navigator.serviceWorker.ready.then(function(registration) {
        const options = {
            userVisibleOnly: true,
            applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY'
        };

        registration.pushManager.subscribe(options).then(function(subscription) {
            console.log('User is subscribed:', subscription);
        }).catch(function(error) {
            console.error('Failed to subscribe the user:', error);
        });
    });
}

```





























---
## Note: Retrieving Values for Sending Notifications
The `subscription` variable contains crucial values such as:

`USER_SUBSCRIPTION_ENDPOINT`, `USER_P256DH_KEY`, and `USER_AUTH_KEY`

These values are essential for pushing notifications from the server.

---

#### `service-worker.js`
```javascript
self.addEventListener('push', function(event) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon
    });
});
```

#### `manifest.json`
```json
{
  "name": "My PWA",
  "short_name": "PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "description": "A simple PWA with push notifications",
  "icons": [
    {
      "src": "icons/icon-192x192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icons/icon-512x512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
```

#### `server.js`
```javascript
const webPush = require('web-push');

// Replace with your VAPID keys
const vapidKeys = {
    publicKey: 'YOUR_PUBLIC_VAPID_KEY',
    privateKey: 'YOUR_PRIVATE_VAPID_KEY'
};

webPush.setVapidDetails(
    'mailto:your-email@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// Replace with actual subscription data
const pushSubscription = {
    endpoint: 'USER_SUBSCRIPTION_ENDPOINT',
    keys: {
        p256dh: 'USER_P256DH_KEY',
        auth: 'USER_AUTH_KEY'
    }
};

const payload = JSON.stringify({
    title: 'Push Notification Title',
    body: 'This is the body of the push notification.',
    icon: 'icons/icon-192x192.png'
});

const options = {
    TTL: 60
};

webPush.sendNotification(pushSubscription, payload, options)
    .then(response => console.log('Notification sent successfully:', response))
    .catch(error => console.error('Error sending notification:', error));
```

### Step 7: Run the Local Server
Start the local server to serve the PWA:
```bash
http-server -c-1
```
Open your browser and navigate to `http://localhost:8080` to access your PWA.

### Step 8: Send a Push Notification
To send a push notification, update the `pushSubscription` object in `server.js` with the subscription data from the frontend (logged in the console). Then run:
```bash
node server.js
```

## To Obtain VAPID Keys:
To generate your VAPID keys (public and private), run the following command:
```bash
npx web-push generate-vapid-keys
```

---

## Testing Push Notifications
1. Enable notifications by clicking the **Enable Notifications** button on your PWA.
2. Use the subscription data logged in the console to update `server.js`.
3. Run `server.js` to send the push notification, and the notification should appear on your device.

---

### Notes:
- Ensure that the push subscription keys in `server.js` are updated with the actual data from the client-side.
- Push notifications should work even if the PWA is closed (as long as the service worker is running and notifications are enabled).
