import React, { useState, useEffect, useRef } from "react";
import { openDB } from "idb";

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [offlineImages, setOfflineImages] = useState([]);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    fetchOfflineImages();
  }, []);

  const fetchOfflineImages = async () => {
    try {
      const db = await openDB("myDatabase", 3);
      const transaction = db.transaction("userImg", "readonly");
      const store = transaction.objectStore("userImg");
      const images = await store.getAll();
      setOfflineImages(images);
      db.close();
    } catch (error) {
      console.error("Error accessing IndexedDB:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            saveImageToOfflineStorage(imageUrl);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const saveImageToOfflineStorage = async (imageUrl) => {
    try {
      const db = await openDB("myDatabase", 3);

      const transaction = db.transaction("userImg", "readwrite");
      const store = transaction.objectStore("userImg");

      const imageData = {
        imageUrl: imageUrl,
      };

      const request = store.add(imageData);

      request.onsuccess = async () => {
        await fetchOfflineImages();
      };

      request.onerror = (event) => {};

      await transaction.complete;

      db.close();
    } catch (error) {
      console.error("Error accessing IndexedDB:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="image-upload-container">
        <div className="box-decoration">
          <div onClick={handleClick} style={{ cursor: "pointer" }}>
            {selectedImage && selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="upload image"
                className="img-display-after"
              />
            ) : (
              <img
                src="/image/fileupload.png"
                alt="upload image"
                className="img-display-before"
              />
            )}

            <input
              id="image-upload-input"
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
          <label htmlFor="image-upload-input" className="image-upload-label">
            {selectedImage ? selectedImage.name : "Choose an image"}
          </label>

          <button
            className="image-upload-button"
            onClick={saveImageToOfflineStorage}
          >
            Upload
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImagePicker;
