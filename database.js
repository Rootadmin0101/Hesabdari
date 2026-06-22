const DB_NAME = "HesabdariDB";
const DB_VERSION = 1;
const STORE_NAME = "records";

let db = null;

function openDatabase() {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {

            db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true
                });

            }

        };

        request.onsuccess = function (event) {

            db = event.target.result;

            resolve(db);

        };

        request.onerror = function () {

            reject(request.error);

        };

    });
}

async function getAllRecords() {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readonly");

        const store = tx.objectStore(STORE_NAME);

        const req = store.getAll();

        req.onsuccess = () => resolve(req.result);

        req.onerror = () => reject(req.error);

    });

}

async function addRecord(data) {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        const req = store.add(data);

        req.onsuccess = () => resolve();

        req.onerror = () => reject(req.error);

    });

}

async function updateRecord(data) {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        const req = store.put(data);

        req.onsuccess = () => resolve();

        req.onerror = () => reject(req.error);

    });

}

async function deleteRecord(id) {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        const req = store.delete(id);

        req.onsuccess = () => resolve();

        req.onerror = () => reject(req.error);

    });

}

async function clearDatabase() {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        const req = store.clear();

        req.onsuccess = () => resolve();

        req.onerror = () => reject(req.error);

    });

}