import React, { useState, useRef } from "react";
import SignaturePad from "react-signature-canvas";
import { openDB } from "idb";

const Signature = () => {
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPad = useRef(null);

  const clear = () => {
    sigPad.current.clear();
    setTrimmedDataURL("");
  };

  const trim = () => {
    const trimmedData = sigPad.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setTrimmedDataURL(trimmedData);
    saveSignToOfflineStorage(trimmedData);
  };

  const saveSignToOfflineStorage = async (signatureData) => {
    try {
      const db = await openDB("myDatabase", 3, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("userSign")) {
            const store = db.createObjectStore("userSign", {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });

      if (!signatureData) {
        return;
      }

      const transaction = db.transaction("userSign", "readwrite");
      const store = transaction.objectStore("userSign");

      const signData = {
        path: signatureData,
      };

      const request = store.add(signData);

      request.onsuccess = () => {};

      request.onerror = (event) => {};

      await transaction.complete;
      db.close();
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="signature_wrapper">
        <h3 className="mt-5">Add Your Signature</h3>
        <div className="sigContainer mt-5">
          <SignaturePad canvasProps={{ className: "sigPad" }} ref={sigPad} />
        </div>
        <div className="signbuttons mt-3">
          <button className="btn btn-danger me-2" onClick={clear}>
            Clear
          </button>
          <button className="btn btn-primary" onClick={trim}>
            save
          </button>
        </div>
        <div className="sign_display mt-5">
          {trimmedDataURL && <img className="sigImage" src={trimmedDataURL} />}
        </div>
      </div>
    </div>
  );
};

export default Signature;
