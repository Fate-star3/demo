import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/styles/reset.css'
import store from '@/store'
import '@/common/api'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>

)
