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
import { useState } from "react";
import { FaBell } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const [shownotifications, setShowNotifications] = useState(false);
  const user = useUserStore((state) => state.user);

  const notifications = [
    {
      isNew: true,
      title: "New Event - 1",
      description: "New event has been added.",
    },
    {
      isNew: false,
      title: "New Event - 2",
      description: "New event has been added.",
    },
    {
      isNew: false,
      title: "New Event - 3",
      description: "New event has been added.",
    },
  ];

  return (
    <div className="w-full h-[5rem] flex items-center justify-between shadow-lg">
      <div className="mx-8">
        {" "}
        <a href="#">
          <img src="images/logo_small.png" className="h-[3.5rem]"></img>
        </a>
      </div>
      <div className="text-2xl font- max-lg:text-base font-['Gothic A1'] text-[#001d3f] font-bold">
        Student Gymkhana - IIT Mandi
      </div>
      <div className="flex items-center gap-10">
        {user && (
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger>
                <FaBell className="text-xl text-blue-500 cursor-pointer" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <span className="font-semibold text-xl">Notifications</span>
                  </SheetTitle>
                  <SheetDescription>
                    {
                      <div className="flex flex-col gap-2">
                        {notifications.map((notification, index) => (
                          <Card key={index}>
                            <CardHeader className="p-3">
                              <div className="flex flex-col">
                                <span className="font-semibold text-md">
                                  {notification.title}
                                </span>
                                <span>{notification.description}</span>
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    }
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex justify-between items-center gap-3 w-full">
                    <div className="h-12 w-12 gap-1 flex items-center">
                      <img
                        className=" rounded-full"
                        src={user.photoURL}
                        alt="text"
                      />
                      <span className="text-xs flex  font-medium">
                        {user.displayName}
                      </span>
                    </div>
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
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center mx-8 space-y-2">
          {!user && (
            <button
              onClick={googleLogin}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mx-2 mt-2 overflow-hidden text-base font-medium rounded-[0.9rem] group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center gap-2 font-bold font-['Gothic A1'] rounded-xl">
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
