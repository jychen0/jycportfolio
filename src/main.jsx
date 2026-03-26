import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import App from './App'; 
import './css/globals.css';
import './css/navbar.css';
import './css/home.css';
import './css/about.css';
import './css/projects.css';
import './css/project-detail.css';
import './css/contact.css';
import './css/footer.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter basename='/jycportfolio/'> */}
    <BrowserRouter>
    <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
