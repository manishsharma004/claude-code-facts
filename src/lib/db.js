/**
 * IndexedDB wrapper for managing application configuration and generated facts
 */

const DB_NAME = 'ClaudeCodeFactsDB';
const DB_VERSION = 1;
const STORE_CONFIG = 'config';
const STORE_FACTS = 'generatedFacts';

let db = null;

/**
 * Initialize the database
 */
export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      // Create config store if it doesn't exist
      if (!database.objectStoreNames.contains(STORE_CONFIG)) {
        database.createObjectStore(STORE_CONFIG, { keyPath: 'key' });
      }

      // Create generated facts store if it doesn't exist
      if (!database.objectStoreNames.contains(STORE_FACTS)) {
        const factStore = database.createObjectStore(STORE_FACTS, {
          keyPath: 'id',
          autoIncrement: true
        });
        factStore.createIndex('timestamp', 'timestamp', { unique: false });
        factStore.createIndex('provider', 'provider', { unique: false });
      }
    };
  });
}

/**
 * Get a config value
 */
export async function getConfig(key) {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_CONFIG], 'readonly');
    const store = transaction.objectStore(STORE_CONFIG);
    const request = store.get(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result?.value);
  });
}

/**
 * Set a config value
 */
export async function setConfig(key, value) {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_CONFIG], 'readwrite');
    const store = transaction.objectStore(STORE_CONFIG);
    const request = store.put({ key, value });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

/**
 * Get all config entries
 */
export async function getAllConfig() {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_CONFIG], 'readonly');
    const store = transaction.objectStore(STORE_CONFIG);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = {};
      request.result.forEach((item) => {
        result[item.key] = item.value;
      });
      resolve(result);
    };
  });
}

/**
 * Save a generated fact
 */
export async function saveGeneratedFact(text, icon, provider) {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_FACTS], 'readwrite');
    const store = transaction.objectStore(STORE_FACTS);
    const request = store.add({
      text,
      icon,
      provider,
      timestamp: Date.now()
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

/**
 * Get all generated facts
 */
export async function getAllGeneratedFacts() {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_FACTS], 'readonly');
    const store = transaction.objectStore(STORE_FACTS);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

/**
 * Delete a generated fact
 */
export async function deleteGeneratedFact(id) {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_FACTS], 'readwrite');
    const store = transaction.objectStore(STORE_FACTS);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

/**
 * Clear all generated facts
 */
export async function clearGeneratedFacts() {
  if (!db) await initDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_FACTS], 'readwrite');
    const store = transaction.objectStore(STORE_FACTS);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}
