import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import './bootstrap.min.css';
import { AppContextProvider} from './context/AppContext.jsx'; 

createRoot(document.getElementById('root')).render(
  // This means any component inside <App /> can access the values in appContext without needing props.
  <BrowserRouter>
    <AppContextProvider>
      <App/>
    </AppContextProvider>
  </BrowserRouter>
)
