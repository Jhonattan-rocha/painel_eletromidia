import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import "./main.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
)
