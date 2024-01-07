import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './Context/AppProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
    <RouterProvider router={App}/>
    </AppProvider>
    {/* <App /> */}
  </React.StrictMode>,
)
