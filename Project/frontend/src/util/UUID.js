class ClientDB {
    #db;
    constructor(dbName = "clientDB") {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, 1);

            request.onupgradeneeded = (event) => {
                this.#db = event.target.result;
                const db = this.#db;

                if (!db.objectStoreNames.contains("settings")) {
                    db.createObjectStore("settings", { keyPath: "key" });
                }
            };

            request.onsuccess = (event) => {
                this.#db = event.target.result;   // <-- IMPORTANT
                resolve(this);                    // return instance, not DB
            };

            request.onerror = () => reject(request.error);
        });
    }

    store(key, value) {
        return new Promise((resolve, reject) => {
            const tx = this.#db.transaction("settings", "readwrite");
            const store = tx.objectStore("settings");
            store.put({ key, value });

            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    }

    read(key) {
        return new Promise((resolve) => {
            const tx = this.#db.transaction("settings", "readonly");
            const store = tx.objectStore("settings");
            const req = store.get(key);

            req.onsuccess = () => resolve(req.result?.value || null);
            req.onerror = () => resolve(null);
        });
    }
}

export default async function deviceid() {
    const db = await new ClientDB("clientDB");  // <-- await the class instance

    let uuid = await db.read("deviceID");

    if (uuid) return uuid;

    uuid = crypto.randomUUID();

    await db.store("deviceID", uuid);           // <-- corrected method

    return uuid;
}
