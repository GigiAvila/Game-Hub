import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import Pagina1 from './pages/Pagina1.jsx'
import Pagina2 from './pages/Pagina2.jsx'
import Pagina3 from './pages/Pagina3.jsx'
import Pagina4 from './pages/Pagina4.jsx'
import Pagina5 from './pages/Pagina5.jsx'
import Pagina6 from './pages/Pagina6.jsx'
import Pagina7 from './pages/Pagina7.jsx'
import Pagina8 from './pages/Pagina8.jsx'
import Pagina9 from './pages/Pagina9.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" index element={<Home />} />
        <Route path="/pagina1" element={<Pagina1 />} />
        <Route path="/pagina2" element={<Pagina2 />} />
        <Route path="/pagina3" element={<Pagina3 />} />
        <Route path="/pagina4" element={<Pagina4 />} />
        <Route path="/pagina5" element={<Pagina5 />} />
        <Route path="/pagina6" element={<Pagina6 />} />
        <Route path="/pagina7" element={<Pagina7 />} />
        <Route path="/pagina8" element={<Pagina8 />} />
        <Route path="/pagina9" element={<Pagina9 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
