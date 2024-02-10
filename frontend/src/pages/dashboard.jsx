import Modal from "../components/Modal";
import React from "react";
import { useState } from "react";

function dashboard() {
  const Status = ["Create Proposal", "Pending", "In Review", "Past"];
  const [status, setStatus] = useState(Status[1]);
  const [modal, setModal] = useState(false);

  const handleStatus = (val) => {
    setStatus(val);
  };    

  const [data, setData] = useState([]);


  return (
    <>
      <div className="p-5 flex flex-col gap-10">
        <div className="flex gap-5">
          <div
            onClick={() => handleStatus(Status[1])}
            className={`mx-1 flex h-[80px] ${
              status === Status[1] ? "bg-blue-200" : ""
            } w-[220px] cursor-pointer justify-between rounded-lg bg-white pl-3 pt-2 shadow-lg`}
          >
            <div className="flex flex-col gap-1 py-1 pl-2">
              <span className=" text-2xl font-semibold text-slate-600">0</span>
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
              <span className=" text-2xl font-semibold text-slate-600">0</span>
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
              <span className=" text-2xl font-semibold text-slate-600">0</span>
              <span className=" text-sm text-slate-400">{Status[3]}</span>
            </div>
          </div>
        </div>

        <div className="flex h-[50vh] w-[100%] flex-col rounded-lg p-3 border bg-white shadow-lg">
          <div className="flex w-[100%] px-5 py-4 text-xl ">
            {status + " Proposals"}
          </div>
          <figure onClick={() => setModal(true)} className="flex flex-col items-center justify-center">
            <img
              width="22"
              height="22"
              className="mt-5 h-[200px] w-[200px]"
              src="/images/nodata.gif"
              alt=""
            />
            <figcaption className="text-[#2863C2]">No Data Found!</figcaption>
          </figure>
        </div>

        <Modal modal={modal} setModal={setModal} />
      </div>
    </>
  );
}

export default dashboard;
