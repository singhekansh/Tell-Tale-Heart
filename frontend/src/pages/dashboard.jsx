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
import { toast } from "@/components/ui/use-toast";
import { ApiWithAuth } from "@/lib/axios";
import Loading from "@/components/Loading";
import { DateTime } from "luxon";
import ApprovalModal from "@/components/ApproveModal"

const validateData = (data) => {
  if(!data.title) return "Please enter title."
  if(!data.bill) return "Please enter Bill Number."
  if(!data.supplier) return "Please enter Supplier."
  if(!data.amount) return "Please enter amount."
  if(!data.quantity) return "Please enter quantity."
  if(!data.description) return "Please enter description."
  if(!data.head) return "Please enter head."
  if(!data.purpose) return "Please enter purpose."
  return null;
};

const getLatestBlock = (dataArray) => {
  let t = { createdAt: null }
  dataArray.forEach((data) => {
    if(new Date(t.createdAt).getTime() < new Date(data.createdAt).getTime()) {
      t = data
    }
  })
  if(!t.createdAt) throw new Error('Invalid Data.')
  return t
}



export default function dashboard() {
  const user = useUserStore((state) => state.user);
  const user_type = useUserStore((state) => state.user_type)
  const navigate = useNavigate();


  const [loading, setloading] = useState(false);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    getProposals()
  }, [])

  const Status = ["Create Proposal", "Pending", "In Review", "Past"];
  const [status, setStatus] = useState(Status[1]);
  const [proposalmodal, setProposalModal] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [currentProposal, setCurrentProposal] = useState(null);
  const [isApproval, setIsApproval] = useState(true);

  const handleStatus = (val) => {
    setStatus(val);
  };

  const getProposals = async () => {
    try {
      setloading(true);
      const proposals = (await ApiWithAuth.get("/proposal")).data.data;
      console.log("GET /proposal: ", proposals);
      setProposals(proposals.map((prp) => ({ showHistory: false, ...prp })))
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error("GET /proposal: ", error);
      alert("Failed to get proposals.")
    }
    setloading(false);
  };

  const addProposals = async (data) => {
    const error = validateData(data);
    if (error) return toast({ title: error });

    try {
      const newProposal = (await ApiWithAuth.post("/proposal", data)).data.data;
      console.log("POST /proposal: ", newProposal);
      getProposals();
      setProposalModal(false)
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error("POST /proposal: ", error);
      toast({
        title: "Failed to create new proposal",
        description: error,
      });
    }
  };

  const showAprooveButton = (proposal) => {
    const latestChain = getLatestBlock(proposal.updates)
    for(let i=0; i<latestChain.progress.length; i++) {
      var blk = latestChain.progress[i]
      if(blk.status === "waiting" ) {
        if(blk.user !== user_type) return false
        else return true
      }
    }
    return false
  }

  const approveProposal = async (data) => {
    if(!data.remark) return toast({ title: 'Please enter remark.' }) 
    if(!currentProposal) return toast({ title: 'Something went wrong. Please reload.' })

    try {
      const res = (await ApiWithAuth.post(`/proposal/approve/${currentProposal}`, data)).data;
      console.log(`POST /proposal/approve/${currentProposal}: `, res);
      toast({ title: res.message })
      getProposals();
      setApprovalModal(false)
      setCurrentProposal(null)
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error(`POST /proposal/approve/${currentProposal}: `, error);
      toast({
        title: "Failed to create new proposal",
        description: error,
      });
    }
  };

  const rejectProposal = async (data) => {
    if(!data.remark) return toast({ title: 'Please enter remark.' }) 
    if(!currentProposal) return toast({ title: 'Something went wrong. Please reload.' })

    try {
      const res = (await ApiWithAuth.post(`/proposal/reject/${currentProposal}`, data)).data;
      console.log(`POST /proposal/reject/${currentProposal}: `, res);
      toast({ title: res.message })
      getProposals();
      setApprovalModal(false)
      setCurrentProposal(null)
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error(`POST /proposal/reject/${currentProposal}: `, error);
      toast({
        title: "Failed to reject Proposal",
        description: error,
      });
    }
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
                    {proposals.length}
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
            {user_type && user_type  === 'Dean Students'  && (
              <div className="flex gap-5">
                <Link
                  to="/club"
                  class="bg-blue-500 transition-all duration-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Clubs
                </Link>
                <Link
                  to="/society"
                  class="bg-blue-500 transition-all duration-500 hover:bg-blue-70 text-white font-bold py-2 px-4 rounded"
                >
                  Societies
                </Link>
              </div>
            )}
          </div>
          {user_type && user_type.includes('Cordinator') && (
            <>
              {/* // if user Club */}
              <div
                onClick={() => setProposalModal(true)}
                className="flex flex-col justify-center  items-center cursor-pointer text-blue-500 text-4xl"
              >
                <IoIosAddCircle />
                <span className="text-black text-nowrap text-sm"> Create New Proposal</span>
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
          ) : loading ? <Loading /> : (
            proposals.map((val, index) => {

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
                                  ₹{val.amount}
                                </span>
                              </span>
                              <span className="text-sm font-medium">
                                Date:{" "}
                                <span className=" font-normal">{ DateTime.fromISO(val.createdAt)?.toLocaleString(DateTime.DATE_MED) }</span>
                              </span>
                            </div>
                            <div className="flex gap-2 items-center justify-center mt-2">
                              <img
                                className="h-8 w-8 rounded-full"
                                src="images/bg-cover.jpg"
                                alt=""
                              />
                              <span className="text-md">{val.club.name}</span>
                            </div>
                          </div>
                          { user_type && showAprooveButton(val) && (
                              <div className="flex gap-2 z-50">
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsApproval(false)
                                    setCurrentProposal(val._id)
                                    setApprovalModal(true)
                                  }}
                                  variant="destructive"
                                >
                                  Reject
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsApproval(true)
                                    setCurrentProposal(val._id);
                                    setApprovalModal(true)
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
                                  onClick={() => setProposals(proposals.map(prp => {
                                    if(prp._id !== val._id) return prp
                                    return { ...prp, showHistory: !prp.showHistory } 
                                  }))}
                                />
                              </span>
                              {val.updates.length > 1 ? val.updates
                                .slice(0, val.updates.length - 1)
                                .reverse()
                                .map((update, index) => (
                                  <>
                                    {val.showHistory && (
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
                                )) : val.showHistory &&  <div>No previous history</div>}
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

        <AddProposal modal={proposalmodal} setModal={setProposalModal} submit={addProposals} />
        <ApprovalModal modal={approvalModal} setModal={setApprovalModal} approveProposal={approveProposal} rejectProposal={rejectProposal} isApproval={isApproval} />
      </div>
    </>
  );
}

