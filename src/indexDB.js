// script.js

document.addEventListener("DOMContentLoaded", function() {
  const dbName = "myDatabase";
  const dbVersion = 3;
  const storeName = "users";
  const userImgStoreName = "userImg";
  const userSignStoreName = "userSign"; 
  const count = 0;

  let db;

  function initDatabase() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(dbName, dbVersion);

      request.onerror = function(event) {
        console.error("Database error:", event.target.error);
        reject(event.target.error);
      };

      request.onsuccess = function(event) {
        db = event.target.result;
        resolve();
      };

      request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
        }

        if (!db.objectStoreNames.contains(userImgStoreName)) {
          db.createObjectStore(userImgStoreName, { keyPath: `${count++}`, autoIncrement: true });
        }

        if (!db.objectStoreNames.contains(userSignStoreName)) { 
          db.createObjectStore(userSignStoreName, { keyPath: `${count++}`, autoIncrement: true });
        }
      };
    });
  }

  async function main() {
    await initDatabase();
  }

  main();
});
