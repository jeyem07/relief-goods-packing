import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom'
import LandingPage from '@/app/routes/landing-page'
import PackingPage from '@/app/routes/packing-page'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/app',
    element: <PackingPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]

export const router = createBrowserRouter(routes)
