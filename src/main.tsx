import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import  store  from './app/store.tsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>

      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
