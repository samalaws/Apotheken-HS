
export function exportToJSON() {
    
    const dbName = 'keyval-store';
    const storeName = 'keyval';
    
    // Open the IndexedDB database
    const request = indexedDB.open(dbName);

    request.onerror = function (event) {
        console.error('Error opening database:', event.target.error);
    };

    request.onsuccess = function (event) {
        const db = event.target.result;

      // Open a transaction to access the store
        const transaction = db.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);

      // Get all data from the store
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = function () {
            const data = getAllRequest.result;

            // Convert data to JSON string
            const jsonString = JSON.stringify(data, null, 2);
            // Create a Blob containing the JSON data
            const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a download link
        const a = document.createElement('a');
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = '../Data/exportedData.json';

        // Append the link to the document and trigger a click event
        document.body.appendChild(a);
        a.click();

        // Remove the link from the document
        document.body.removeChild(a);

        // Revoke the URL to release resources
        URL.revokeObjectURL(url);
    };

    transaction.oncomplete = function () {
        db.close();
    };
};

request.onupgradeneeded = function (event) {
      // Handle database upgrade if needed
    const db = event.target.result;
    const store = db.createObjectStore(storeName, { keyPath: 'id' });

      // Add any necessary object store configurations

      // Example: store.createIndex('indexName', 'propertyName', { unique: false });
    };
}