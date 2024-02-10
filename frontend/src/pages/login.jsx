import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaSquarePhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { FaGoogle } from "react-icons/fa";

function login() {
  return (
    <div className="wrapper">
      <div className="w-full h-[5rem] flex items-center justify-between">
        <div className="mx-8">
          {" "}
          <a href="#">
            <img src="images/logo_small.png" className="h-[3.5rem]"></img>
          </a>
        </div>
        <div className="text-2xl font-medium max-lg:text-base">Student Gymkhana - IIT Mandi</div>
        <div className="flex flex-col justify-center mx-8 space-y-2">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 flex items-center gap-2 font-mono font-bold">
              <span className="">
                <FaGoogle />
              </span>{" "}
              Login
            </span>
          </button>
        </div>
      </div>
      <div className="h-[90vh] bg-[url('images/bg-cover.jpg')] bg-cover bg-bottom"></div>
      <div className="h-[15vh] relative">
        <div className="h-[1px] border bg-black w-full absolute bottom-3"></div>
      </div>
      <div className="h-[50vh] bg-[#001d3f] flex max-lg:flex-col max-lg:h-[80vh] items-center justify-around">
        <div>
          <img src="images/newlogo.png" className="h-[30vh] px-8"></img>
        </div>
        <div className="text-white font-mono max-lg:justify-center max-lg:items-center flex flex-col flex-wrap gap-4">
          <div className="text-[2rem]">Contact Us</div>
          <div className="flex flex-col max-lg:items-center">
            <div className="flex items-center gap-2">
            <FaSquarePhone />
            Phone : 
            <a href="tel:01905267000">01905267000</a>
            </div>
            <div className="flex items-center gap-2">
              <IoMdMail />
              E-mail :{" "}
              <a href="mailto:it_helpdesk@iitmandi.ac.in">
                it_helpdesk@iitmandi.ac.in
              </a>
            </div>
          </div>
          <div>Follow Us</div>
          <div className="flex items-center gap-2 text-[2rem]">
            <div className="hover:text-[#00308F] hover:scale-110 transition duration-300">
              <a href="https://www.facebook.com/IITMandi2009/">
                <FaFacebookSquare />
              </a>
            </div>
            <div className="hover:text-[#00308F] hover:scale-110 transition duration-300">
              <a href="https://twitter.com/iit__mandi">
                <RiTwitterXFill />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black h-[10vh] text-white text-center pt-4">
        Made with ❤️ by Team The Tell-Tale h3art
      </div>
    </div>
  );
}

export default login;
