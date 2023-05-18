import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import ProfileProvider from './context/profile/profile.provider.tsx'
import './index.css'
import router from './routes/routes.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProfileProvider>
    <RouterProvider router={router} />
    </ProfileProvider>
  </React.StrictMode>,
)
