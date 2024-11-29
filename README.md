# HydotFMS-Admin

* Creating A PWA 

**`manifest.json`**
```
{
  "short_name": "Hydot FMS",
  "name": "Hydot FMS",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    },
    {
      "src": "maskable_icon.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "maskable"
    }
  ],
  "start_url": "/index.html",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "description": "Hydot Fleet Management System Admin Panel. Manage your fleet with ease.",
  "categories": ["business", "productivity", "tools"],
  "screenshots": [
    {
      "src": "screenshot1.png",
      "sizes": "1080x1920",
      "type": "image/png"
    },
    {
      "src": "screenshot2.png",
      "sizes": "1080x1920",
      "type": "image/png"
    }
  ]
}


```
___

**`index.html`**

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Hydot Commerce"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    
    
    <title>Hydot FMS Admin</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script>

      if('serviceWorker' in navigator){

        window.addEventListener('load', ()=>{
          navigator.serviceWorker.register('./serviceworker.js')
          .then((reg)=>console.log("Success", reg.scope))
          .catch((err)=>console.log("Failure", err));



        })




      }



    </script>


  </body>
</html>


```
___


**`serviceworker.js`**

```
const CACHE_NAME = 'hydot-cache-v1';
const urlsToCache = ['index.html', 'offline.html', '/css/styles.css', '/js/app.js'];

const self = this;
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened Cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then((response) => response || caches.match('offline.html')))
  );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

```
___

**`offline.html`**
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offline</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      background-color: #f8f9fa;
      color: #333;
    }
    h1 {
      font-size: 2rem;
    }
    p {
      margin: 0.5rem 0;
    }
  </style>
</head>
<body>
  <h1>You're Offline</h1>
  <p>Check your internet connection and try again.</p>
</body>
</html>


```
___
* Converting it into Apk

**`Install the packages`**
```
npm install -g @bubblewrap/cli
```
___

**`Initialize Bubblewrap Project`**
```
bubblewrap init

```
___

**`Generate the Keystore`**
```
keytool -genkeypair \
    -v \
    -keystore /Users/glydetek/Desktop/HydotTech/Products/FMS/Admin/android.keystore \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -alias android

```
___

**`Build the App`**
```
bubblewrap build

```
___
