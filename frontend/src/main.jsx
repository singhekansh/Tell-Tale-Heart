import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "@/App"
import Loading from '@/components/Loading';


const PageLoader = () => { return <div className='w-full h-screen flex items-center justify-center'><Loading/></div> }




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<PageLoader/>}>
      <App />
    </Suspense>
  </React.StrictMode>,
)
