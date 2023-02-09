import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '@Src/store'
import '@Assets/css/styles.css'
import 'rc-slider/assets/index.css'
import App from '@Src/App'
import init from '@Src/wailsbridge'

const container = document.getElementById('root') as HTMLElement

const root = createRoot(container)

init(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
