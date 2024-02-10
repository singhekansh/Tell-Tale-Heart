import AddProposal from "../components/AddProposal";
import React from "react";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Mermaid from "react-mermaid2";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function dashboard() {
  const Status = ["Create Proposal", "Pending", "In Review", "Past"];
  const [status, setStatus] = useState(Status[1]);
  const [proposalmodal, setProposalModal] = useState(false);

  const handleStatus = (val) => {
    setStatus(val);
  };

  const [data, setData] = useState([]);

  const generateMermaidDefinition = (updates) => {
    const nodes = updates.flat().map((update, index) => {
      const { user, date, status, remark } = update;

      return `  ${user}(User: ${user}<br/> Date:${date} ):::${
        status === "rejected" ? "rej" : "app"
      }--> `;
    });

    // Add a placeholder node to indicate the end of the linked list
    if (updates[updates.length - 1].status === "rejected")
      nodes.push("End(Rejected):::end_rej");

    return `flowchart LR\n${nodes.join("")} 
        classDef rej fill:#E53E3E 
        classDef app fill:#68D391
        classDef end_rej fill:#f39c12 `;
  };

  const proposals = [
    {
      title: "New",
      date: "24th jan",
      bill: "bill",
      supplier: "supplier",
      qty: "qty",
      amt: "10000",
      desc: "The project is a data asset build on professionals in three key industry segments namely, Professional Services, Life Sciences and Technology with a specific set of data fields to map to a profile.",
      cat: "cat",
      section: "section",
      head: "head",
      fund: "fund",
      payment: "payment",
      type: "type",
      purpose: "purpose",
      club: "KamandPrompt",
      updated: [
        [
          { user: "KP", date: "date", status: "approved", remark: "remark" },
          {
            user: "KP_sec",
            date: "date",
            status: "approved",
            remark: "remark",
          },
          { user: "KP_FA", date: "date", status: "approved", remark: "remark" },
          {
            user: "TECH_FA",
            date: "date",
            status: "rejected",
            remark: "remark",
          },
        ],
      ],
    },
    {
      title: "New",
      date: "24th jan",
      bill: "bill",
      supplier: "supplier",
      qty: "qty",
      amt: "10000",
      desc: "Project description for Foundation School Develop a detailed teaching aid for the topic “ Elements, Compounds and Mixtures” in Chemistry for students of Grade 6 in India, that can accompany the Central Board of Secondary Education (CBSE) curriculum. The teaching aid is based on a standard storyboard provided by the Foundation School and should be created using Microsoft PowerPoint.",
      cat: "cat",
      section: "section",
      head: "head",
      fund: "fund",
      payment: "payment",
      type: "type",
      purpose: "purpose",
      club: "KamandPrompt",
      updated: [
        [
          { user: "KP", date: "date", status: "approved", remark: "remark" },
          {
            user: "KP_sec",
            date: "date",
            status: "approved",
            remark: "remark",
          },
          { user: "KP_FA", date: "date", status: "approved", remark: "remark" },
          {
            user: "TECH_FA",
            date: "date",
            status: "rejected",
            remark: "remark",
          },
        ],
      ],
    },
  ];

  return (
    <>
      <div className="p-5 flex flex-col gap-10">
        <div className="flex gap-5 justify-between items-center">
          <div className="flex gap-5">
            <div
              onClick={() => handleStatus(Status[1])}
              className={`mx-1 flex h-[80px] ${
                status === Status[1] ? "bg-blue-200" : ""
              } w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">{Status[1]}</span>
              </div>
            </div>
            <div
              onClick={() => handleStatus(Status[2])}
              className={`mx-1 flex h-[80px] w-[220px] ${
                status === Status[2] ? "bg-blue-200" : ""
              } cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">{Status[2]}</span>
              </div>
            </div>
            <div
              onClick={() => handleStatus(Status[3])}
              className={`mx-1 flex h-[80px] w-[220px] ${
                status === Status[3] ? "bg-blue-200" : ""
              } cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg`}
            >
              <div className="flex flex-col gap-1 py-1 pl-2">
                <span className=" text-2xl font-semibold text-slate-600">
                  0
                </span>
                <span className=" text-sm text-slate-400">{Status[3]}</span>
              </div>
            </div>
          </div>
          {
            // if user Club
            <div
              onClick={() => setProposalModal(true)}
              className=" flex flex-col items-center justify-center cursor-pointer text-blue-500 text-4xl"
            >
              <IoIosAddCircle />
              <span className="text-black text-sm">Create New Proposal</span>
            </div>
          }
        </div>

        <div className="flex w-[100%] flex-col rounded-lg p-3 border bg-[#F8F8F8] shadow-lg">
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
            proposals.map((val, index) => (
              <div
                key={index}
                className="flex flex-col gap-5 p-3 border my-2 rounded-md bg-white border-gray-200"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex w-full mr-5 justify-between items-center">
                        <div className="flex justify-between flex-col items-start">
                          <span className="text-2xl font-medium">
                            {val.title}
                          </span>
                          <div className="flex gap-3">
                            <span className="text-base">
                              Amount: ${val.amt}
                            </span>
                            <span className="text-base">Date: {val.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <img
                            className="h-8 w-8 rounded-full"
                            src="images/bg-cover.jpg"
                            alt=""
                          />
                          <span className="text-md">{val.club}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">Description</span>
                          <span>{val.desc}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">Status</span>
                          <div>
                            {val.updated.map((update, index) => (
                              <div key={index} className="flex gap-3">
                                <Mermaid
                                  chart={generateMermaidDefinition(update)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))
          )}
        </div>

        <AddProposal modal={proposalmodal} setModal={setProposalModal} />
      </div>
    </>
  );
}

export default dashboard;
