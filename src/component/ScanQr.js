import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { Link } from "react-router-dom";

function ScanQr() {
  const [delay, setDelay] = useState(100);
  const [result, setResult] = useState("");

  function handleScan(data) {
    setResult(data);
    console.log(data);
  }

  function handleError(err) {
    console.log(err);
  }

  return (
    <div className="container">
      <div class="h-100 d-flex align-items-center justify-content-center flex-column">
        {!result && (
          <div className="qr-box">
            <QrReader
              delay={delay}
              style={{ height: 370, width: 494 }}
              onError={handleError}
              onScan={handleScan}
              facingmode="rear"
            />
            <h1 className="display-3">Shwo Your QR here</h1>
          </div>
        )}
        {result && (
          <div className="w-100">
            <p className="display-6 mt-3 text-center">Here is your QRCode Link </p>
            <p
              className="display-6 mt-3 text-center"
              style={{
                overflowWrap: "break-word",
                whiteSpace: "pre-line",
              }}
            >
              <b>{result.text}</b>
            </p>
          </div>
        )}
        {result && (
          <Link
            className="btn btn-primary container-fluid m-3 p-3"
            to={`${result.text}`}
            role="button"
          >
            Procced
          </Link>
        )}
      </div>
    </div>
  );
}

export default ScanQr;
