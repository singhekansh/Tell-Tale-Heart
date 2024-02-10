import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useUserStore } from "./store/userStore";

const Home = React.lazy(() => import('@/pages/index'))
const Login = React.lazy(() => import('@/pages/login'))
import Nav from "./components/Nav";
const Dashboard = React.lazy(() => import('@/pages/dashboard'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
]);


export default function App() {
  const setUser = useUserStore((state) => state.setUser)
  const logout = useUserStore((state) => state.logout)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        auth.currentUser.getIdToken(true).then((idtoken) => {
          setUser({ user, token: idtoken })
        }).catch((err) => {
          toast({
            title: 'Failed to login.',
            description: err.message
          })
        })
      } else {
        logout()
      }
    })
  }, [])


  return (
    <>  
      <Nav/>
      <RouterProvider router={router} />
    </>
  )
}