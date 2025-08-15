import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { ToastProvider} from 'react-toast-notifications'

import {Provider} from 'react-redux'
import generateStore from './redux/store'

// Importar Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

const store = generateStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);