import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Loading from '@/components/Loading';

const Home = React.lazy(() => import('@/pages/index'))
const PageLoader = () => { return <div className='w-full h-screen flex items-center justify-center'><Loading/></div> }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<PageLoader/>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)
