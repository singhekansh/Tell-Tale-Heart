import React from "react";
import { FaGoogle } from "react-icons/fa";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useUserStore } from "@/store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const googleLogin = () => {
  const googleprovider = new GoogleAuthProvider();
  signInWithPopup(auth, googleprovider);
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    toast({
      title: "Logout failed.",
      description: err.message,
    });
  }
};

function Nav() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="w-full h-[5rem] flex items-center justify-between shadow-lg">
      <div className="mx-8">
        {" "}
        <a href="#">
          <img src="images/logo_small.png" className="h-[3.5rem]"></img>
        </a>
      </div>
      <div className="text-2xl font- max-lg:text-base font-['Poppins'] text-orange-600">
        Student Gymkhana - IIT Mandi
      </div>
      <div className="flex items-center gap-10">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="h-12 w-12 gap-1 flex  items-center">
                <img className=" rounded-full" src={user.photoURL} alt="text" />
                <span className="text-xs flex  font-medium">{user.displayName}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <button
                  onClick={logout}
                  className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center gap-2 font-mono font-bold">
                    Logout
                  </span>
                </button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <div className="flex flex-col items-center justify-center mx-8 mt-2 space-y-2">
          {!user && (
            <button
              onClick={googleLogin}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center gap-2 font-mono font-bold">
                <span className="">
                  <FaGoogle />
                </span>{" "}
                Login
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
