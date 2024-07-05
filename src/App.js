import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './page/Home.js'
import Navbar from './component/Navbar.js'
import ScanQr from './component/ScanQr.js'
import DocScan from './component/DocumentScan.js'
import GeoLocation from './component/GeoLocation.js'
import ImagePicker from './component/ImagePicker.js'
import Signature from './component/Signature.js'

function App() {
  return (
    <div className="App">
      <header>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<ScanQr />} />
        <Route path="/document-scan" element={<DocScan />} />
        <Route path="/geo-location" element={<GeoLocation />} />
        <Route path="/image-picker" element={<ImagePicker />} />
        <Route path="/signature" element={<Signature />} />
      </Routes>
    </div>
  );
}

export default App;
