import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUserStore } from "./store/userStore";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Toaster } from "./components/ui/toaster";
import { toast } from "./components/ui/use-toast";

const Home = React.lazy(() => import("@/pages/index"));
import Nav from "./components/Nav";
const Dashboard = React.lazy(() => import("@/pages/dashboard"));
const Club = React.lazy(() => import("@/pages/club"));
const Society = React.lazy(() => import("@/pages/society"));

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/club",
    element: <Club />,
  },
  {
    path: "/society",
    element: <Society />,
  },
]);

export default function App() {
  const user = useUserStore(state => state.user)
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);
  

  
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        auth.currentUser
          .getIdToken(true)
          .then((idtoken) => {
            setUser({ user, token: idtoken });
          })
          .catch((err) => {
            toast({
              title: "Failed to login.",
              description: err.message,
            });
          });
      } else {
        logout();
      }
    });
  }, []);

  return (
    <>
      <PrimeReactProvider>
        <Nav />
        <RouterProvider router={router} />
      </PrimeReactProvider>
      <Toaster />
    </>
  );
}
