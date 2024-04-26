import AddProposal from "../components/AddProposal";
import React, { useEffect } from "react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import AddSociety from "../components/AddSociety";
import { MdPending } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import Node from "../components/Node";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { Link, useNavigate } from "react-router-dom";
import proposals from "../../proposals"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function dashboard() {
  const user = useUserStore((state) => state.user);
  const user_type = useUserStore((state) => state.user_type)
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  const Status = ["Create Proposal", "Pending", "In Review", "Past"];
  const [status, setStatus] = useState(Status[1]);
  const [proposalmodal, setProposalModal] = useState(false);
  const [societymodal, setSocietyModal] = useState(false);

  const handleStatus = (val) => {
    setStatus(val);
  };
  
  return (
    <>
      <div className="p-5 flex flex-col gap-10 mt-5 px-11">
        <div className="flex gap-5 justify-between items-center">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-5">
              <div
                onClick={() => handleStatus(Status[1])}
                className={`mx-1 flex h-[80px] ${
                  status === Status[1] ? "bg-blue-500 text-white" : ""
                } w-[220px] cursor-pointer justify-between rounded-lg bg-[#F8F8F8] transition-all duration-400  pl-3 pt-2 shadow-md`}
              >
                <div className="flex flex-col gap-1 py-1 pl-2 w-full">
                  <span className={` text-2xl font-semibold ${status === Status[1] ?'text-white' :'text-slate-600' }`}>
                    0
                  </span>
                  <div className="flex justify-between">
                    <span className=" text-sm font-medium">{Status[1]}</span>
                    <span className={`mr-5 ${status === Status[1] ?'text-white' :'text-red-500' } text-xl`}>
                      <MdPending />
                    </span>
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleStatus(Status[2])}
                className={`mx-1 flex h-[80px] w-[220px] ${
                  status === Status[2] ? "bg-blue-500 text-white" : ""
                } cursor-pointer justify-between rounded-lg bg-[#F8F8F8] transition-all duration-400  pl-3 pt-2 shadow-md`}
              >
                <div className="flex flex-col gap-1 py-1 pl-2 w-full">
                  <span className={` text-2xl font-semibold ${status === Status[2] ?'text-white' :'text-slate-600' }`}>
                    0
                  </span>
                  <div className="flex justify-between">
                    <span className=" text-sm font-medium">{Status[2]}</span>
                    <span className={`mr-5 ${status === Status[2] ?'text-white' :'text-red-500' } text-xl`}>
                      <MdOutlinePreview />
                    </span>
                  </div>
                </div>
              </div>
              <div
                onClick={() => handleStatus(Status[3])}
                className={`mx-1 flex h-[80px] w-[220px] ${
                  status === Status[3] ? "bg-blue-500 text-white" : ""
                } cursor-pointer justify-between rounded-lg bg-[#F8F8F8] transition-all duration-400 pl-3 pt-2 shadow-md`}
              >
                <div className="flex w-full flex-col gap-1 py-1 pl-2">
                  <span className={` text-2xl font-semibold ${status === Status[3] ?'text-white' :'text-slate-600' }`}>
                    0
                  </span>
                  <div className="flex justify-between">
                    <span className=" text-sm font-medium">{Status[3]}</span>
                    <span className={`mr-5 ${status === Status[3] ?'text-white' :'text-red-500' } text-xl`}>
                      <MdHistory />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {user_type && user_type  === 'CSAP'  && (
              <div className="flex gap-5">
                <Link
                  to="/club"
                  class="bg-blue-500 transition-all duration-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Clubs
                </Link>
                <Link
                  to="/society"
                  class="bg-blue-500 transition-all duration-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Societies
                </Link>
              </div>
            )}
          </div>
          {user && user_type === "CLUB" && (
            <>
              {/* // if user Club */}
              <div
                onClick={() => setProposalModal(true)}
                className="flex flex-col items-center justify-end cursor-pointer text-blue-500 text-4xl"
              >
                <IoIosAddCircle />
                <span className="text-black text-nowrap text-sm">Create New Proposal</span>
              </div>
            </>
          )}
        </div>

        <div className="flex w-[100%] flex-col rounded-lg p-3 border bg-[#F8F8F8] shadow-md">
          <div className="flex w-[100%] px-5 py-4 text-xl ">
            {status + " Proposals"}
          </div>
          {proposals.size === 0 ? (
            <figure className="flex flex-col items-center justify-center">
              <img
                width="22"
                height="22"
                className="mt-5 h-[200px] w-[200px]"
                src="/images/nodata.gif"
                alt=""
              />
              <figcaption className="text-[#2863C2]">No Data Found!</figcaption>
            </figure>
          ) : (
            proposals.map((val, index) => {
              const [hist, setHist] = useState(false);

              return (
                <div
                  key={index}
                  className="flex flex-col gap-5 px-3 border my-2 rounded-md bg-white border-gray-200"
                >
                  <Accordion type="single z-0" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex w-full mr-5 justify-between items-center">
                          <div className="flex justify-between flex-col items-start">
                            <span className="text-xl font-medium">
                              {val.title}
                            </span>
                            <div className="flex gap-3">
                              <span className="text-sm font-medium">
                                Amount:{" "}
                                <span className="font-normal">
                                  {" "}
                                  ${val.amount}
                                </span>
                              </span>
                              <span className="text-sm font-medium">
                                Date:{" "}
                                <span className=" font-normal">{val.date}</span>
                              </span>
                            </div>
                            <div className="flex gap-2 items-center justify-center mt-2">
                              <img
                                className="h-8 w-8 rounded-full"
                                src="images/bg-cover.jpg"
                                alt=""
                              />
                              <span className="text-md">{val.club}</span>
                            </div>
                          </div>
                          {user &&
                            user.email === "studentsdean554@gmail.com" && (
                              <div className="flex gap-2 z-50">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  variant="destructive"
                                >
                                  Reject
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                  variant="secondary"
                                >
                                  Approve
                                </Button>
                              </div>
                            )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium text-sm">
                              Description
                            </span>
                            <span>{val.description}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold">Status</span>
                            <div className="flex flex-col gap-3">
                              <div className="flex flex-col gap-1">
                                <div className="font-medium ml-1">
                                  Attempt - {val.updates.length}
                                </div>
                                <div className="flex">
                                  {val.updates[
                                    val.updates.length - 1
                                  ].progress.map((data, i) => (
                                    <div>
                                      <Node
                                        size={val.updates[0].progress.length}
                                        data={data}
                                        i={i}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <span className="flex items-center gap-1 my-2 font-medium">
                                <span>Show History</span>
                                <Switch
                                  onClick={() => setHist((prev) => !prev)}
                                />
                              </span>
                              {val.updates
                                .slice(0, val.updates.length - 1)
                                .reverse()
                                .map((update, index) => (
                                  <>
                                    {hist && (
                                      <div key={index} className="flex">
                                        <div className="flex flex-col gap-1">
                                          <div className="ml-1 font-medium">
                                            Attempt -{" "}
                                            {val.updates.length - index - 1}
                                          </div>
                                          <div className="flex">
                                            {update.progress.map((data, i) => (
                                              <>
                                                <Node
                                                  size={update.progress.length}
                                                  data={data}
                                                  i={i}
                                                />
                                              </>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              );
            })
          )}
        </div>

        <AddProposal modal={proposalmodal} setModal={setProposalModal} />
        <AddSociety modal={societymodal} setModal={setSocietyModal} />
      </div>
    </>
  );
}

export default dashboard;
