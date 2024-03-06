// Set a name for the current cache
var cacheName = 'Apo-HS'; 

// Default files to always cache

var cacheFiles = [
	'./',
	'/manifest.json',
    '/index.html',
    '/style/style.css',
    '/modules/add.js',
    '/modules/admin.js',
    '/modules/db.js',
    '/modules/exportToJson.js',
    '/modules/home.js',
    '/modules/idb-src.js',
    '/modules/lib.js',
    '/modules/loadData.js',
    '/modules/main.js',
    '/modules/navbar.js',
    '/modules/remove-container.js',
    '/leaflet/leaflet-src.esm.js',
    '/leaflet/leaflet-src.esm.js.map',
    '/leaflet/leaflet-src.js',
    '/leaflet/leaflet-src.js.map',
    '/leaflet/leaflet.css',
    '/leaflet/leaflet.js',
    '/leaflet/leaflet.js.map',
    '/leaflet/images/icon.png',
    '/leaflet/images/layers-2x.png',
    '/leaflet/images/layers.png',
    '/leaflet/images/marker-icon-2x.png',
    '/leaflet/images/marker-shadow.png',
    '/js/app.js',
    '/images/icons/icon-12x12.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-256x256.png',
    '/images/icons/icon-512x512.png',
	'/Data/data.json',
];




self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

    	// Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	); // end e.waitUntil
});


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(

    	// Get all the cache keys (cacheName)
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	); // end e.waitUntil

});


self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch', e.request.url);

	// e.respondWidth Responds to the fetch event
	e.respondWith(

		// Check in cache for the request being made
		caches.match(e.request)


			.then(function(response) {

				// If the request is in the cache
				if ( response ) {
					console.log("[ServiceWorker] Found in Cache", e.request.url, response);
					// Return the cached version
					return response;
				}

				// If the request is NOT in the cache, fetch and cache

				var requestClone = e.request.clone();
				return fetch(requestClone)
					.then(function(response) {

						if ( !response ) {
							console.log("[ServiceWorker] No response from fetch ")
							return response;
						}

						var responseClone = response.clone();

						//  Open the cache
						caches.open(cacheName).then(function(cache) {

							// Put the fetched response in the cache
							cache.put(e.request, responseClone);
							console.log('[ServiceWorker] New Data Cached', e.request.url);

							// Return the response
							return response;
			
				        }); // end caches.open

					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
					});


			}) // end caches.match(e.request)
	); // end e.respondWith
});


