import React, { useEffect, useState } from "react";
import axios from "axios";
import { openDB } from "idb";

const Home = () => {
  const [records, setRecords] = useState([]);
  const [offlineUser, setOfflineUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchOfflineUser();
  }, []);

  const fetchOfflineUser = async () => {
    try {
      const db = await openDB("myDatabase", 3);
      const transaction = db.transaction("users", "readonly");
      const store = transaction.objectStore("users");
      const allUser = await store.getAll();
      setOfflineUser(allUser);
      db.close();
    } catch (error) {}
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setRecords(response.data);
      await addDataToIndexedDB(response.data);
    } catch (error) {
      const dataFromIndexedDB = await getDataFromIndexedDB();
      setLocalData(dataFromIndexedDB);
    }
  };

  const addDataToIndexedDB = async (data) => {
    const db = await openDB("myDatabase", 3, {
      upgrade(db) {
        const store = db.createObjectStore("users", { keyPath: "id" });
        store.createIndex("name", "name");
        store.createIndex("email", "email");
      },
    });
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    data.forEach((record) => {
      store.put(record);
    });
    await tx.done;
  };

  const getDataFromIndexedDB = async () => {
    const db = await openDB("myDatabase", 3);
    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    return store.getAll();
  };

  const handleConnectClick = (id) => {
    setOpen(true);
    setSelectedRecord(id);
  };

  return (
    <React.Fragment>
      <div>
        <div className="container mt-5">
          <div className="row">
            {navigator.onLine
              ? records.map((data, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card mb-3 shadow text-center">
                      <img src="/image/user.jpg" alt="" />
                      <h4>{data.name}</h4>
                      <small>{data.username}</small>
                      <small>{data.email}</small>
                      <div>
                        <button
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleConnectClick(data.id)}
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : offlineUser.map((data, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card mb-3 shadow text-center">
                      <img src="/image/user.jpg" alt="" />
                      <h4>{data.name}</h4>
                      <small>{data.username}</small>
                      <small>{data.email}</small>
                      <div>
                        <button
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => handleConnectClick(data.id)}
                        >
                          Connect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {selectedRecord && (
                  <h5 className="modal-title" id="staticBackdropLabel">
                    {navigator.onLine
                      ? records.find((record) => record.id === selectedRecord)
                          ?.name
                      : offlineUser.find(
                          (record) => record.id === selectedRecord
                        )?.name}
                  </h5>
                )}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {navigator.onLine
                  ? records
                      .filter((record) => record.id === selectedRecord)
                      .map((data) => (
                        <div
                          key={data.id}
                          className="card mb-3 shadow text-center"
                        >
                          <img src="/image/user.jpg" alt="" />
                          <h4>{data.name}</h4>
                          <small className="">
                            User Name: <b>{data.username}</b>
                          </small>
                          <small className="">
                            Email: <b>{data.email}</b>
                          </small>
                          <small className="">
                            Phone: <b>{data.phone}</b>
                          </small>
                          <small className="">
                            Website: <b>{data.website}</b>
                          </small>
                        </div>
                      ))
                  : offlineUser
                      .filter((record) => record.id === selectedRecord)
                      .map((data) => (
                        <div
                          key={data.id}
                          className="card mb-3 shadow text-center"
                        >
                          <img src="/image/user.jpg" alt="" />
                          <h4>{data.name}</h4>
                          <small className="">
                            User Name: <b>{data.username}</b>
                          </small>
                          <small className="">
                            Email: <b>{data.email}</b>
                          </small>
                          <small className="">
                            Phone: <b>{data.phone}</b>
                          </small>
                          <small className="">
                            Website: <b>{data.website}</b>
                          </small>
                        </div>
                      ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
