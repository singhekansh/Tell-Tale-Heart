import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaSquarePhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { useUserStore } from "../store/userStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams()
  const redirectUrl = searchParams.get('redirect')

  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user) {
      navigate(redirectUrl ? `/${redirectUrl}` : "/dashboard");
    }
  }, [user, navigate]);
  return (
    <div className="wrapper">
      <div className="h-[90vh] bg-[url('images/bg-cover.jpg')] bg-cover bg-bottom"></div>
      <div className="h-[15vh] relative font-bold flex items-center  text-[#dadada] text-[2rem] max-sm:h-[10vh]">
        <div className='h-[0.01rem] w-full bg-[#001d3f] absolute bottom-4'>
        </div>
      </div>
      <div className="h-[50vh] bg-[#001d3f] flex max-lg:flex-col max-lg:h-[80vh] items-center justify-around">
        <div>
          <img src="images/newlogo.png" className="h-[30vh] px-8"></img>
        </div>
        <div className="text-white font-['Gothic A1'] max-lg:justify-center max-lg:items-center flex flex-col flex-wrap gap-4">
          <div className="text-[2rem]">Contact Us</div>
          <div className="flex flex-col max-lg:items-center">
            <div className="flex items-center gap-2">
              <FaSquarePhone />
              Phone :<a href="tel:01905267000">01905267000</a>
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

export default App;
