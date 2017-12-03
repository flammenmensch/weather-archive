const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const DATABASE_NAME = 'weather_archive';
const DATABASE_VERSION = 1;

const open = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onerror = request.onblocked = reject;

    request.onsuccess = (event) =>
      resolve(event.target.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const transaction = event.target.transaction;

      [ 'temperature', 'precipitation' ]
        .filter((name) => !hasStore(db, name))
        .forEach((name) => {
          createStore(db, name, { keyPath: 't' }, [
            { name: 'date', key: 't', options: { unique: true } }
          ]);
        });

      transaction.oncomplete = () => resolve(db);
    };
  });

const createStore = (db, name, options={}, indexes=[]) => {
  const store = db.createObjectStore(name, options);
  indexes.forEach((idx) =>
    store.createIndex(idx.name, idx.key, idx.options)
  );
  return store;
};

const hasStore = (db, name) =>
  db.objectStoreNames.contains(name);

const getStore = (name, mode) =>
  open()
    .then((db) => {
      if (!hasStore(db, name)) {
        createStore(db, name, { keyPath: 't' }, [
          { name: 'date', key: 't', options: { unique: true } }
        ]);
      }
      const transaction = db.transaction(name, mode);
      transaction.oncomplete = transaction.onerror = () => db.close();
      return transaction.objectStore(name);
    });

const queryStore = (store) =>
  new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = reject;
    request.onsuccess = (event) => resolve(event.target.result);
  });

const countRecords = (store) =>
  new Promise((resolve) => {
    const request = store.count();
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = () => resolve(0);
  });

const save = (name, json) =>
  getStore(name, 'readwrite')
    .then((store) => {
      json.forEach((value) => {
        store.put(value)
      });
    });

const exists = (name) =>
  getStore(name, 'readonly')
    .then(countRecords)
    .then((result) => result > 0);

const loadFromDb = (name) =>
  getStore(name, 'readonly')
    .then(queryStore);

const loadFromServer = (name) =>
  fetch(`./data/${name}.json`)
    .then((response) => response.json());

export const load = (name) =>
  exists(name)
    .then((result) => {
      if (result) {
        console.log('Load from IndexedDB');
        return loadFromDb(name);
      }
      console.log('Load from Server');
      return loadFromServer(name)
        .then((json) => {
          save(name, json);
          return json;
        });
    });
