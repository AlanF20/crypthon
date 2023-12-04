import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './navbar/Root'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './Home/Home'
import { ChakraProvider } from '@chakra-ui/react'
import { Portfolio } from './portfolio/Portfolio'
import { Coins } from './coins/Coins'
import { Login } from './login/Login'
import { AdminPanel } from './admin/AdminPanel'
import { Error } from './Error/Error'
import { Profile } from './Profile/Profile'
import { Trade } from './Trade/Trade'
import { LandingPage } from './LandingPage/LandingPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <Error />
  },
  {
    path: '/Login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/crypthon',
    errorElement: <Error />,
    element: <Root />,
    children: [
      {
        path: '/crypthon/home',
        element: <Home />,
        errorElement: <Error />
      },
      {
        path: '/crypthon/portfolio',
        element: <Portfolio />,
        errorElement: <Error />
      },
      {
        path: '/crypthon/trade',
        element: <Trade />,
        errorElement: <Error />
      },
      {
        path: '/crypthon/coins',
        element: <Coins />,
        errorElement: <Error />
      },
      {
        path: '/crypthon/profile',
        element: <Profile />,
        errorElement: <Error />
      },
      {
        path: '/crypthon/admin',
        element: <AdminPanel />,
        errorElement: <Error />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
