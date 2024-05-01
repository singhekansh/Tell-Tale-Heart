import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Modal = ({ modal, setModal, approveProposal, rejectProposal, isApproval }) => {
  
  const [data, setData] = useState({
    remark: ''
  });

  const handleInputChange = (value) => {
    setData({ ...data, ...value })
  };

  return (
    <Dialog open={modal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-4 px-5">{ isApproval ? "Approve": "Reject" } Proposal</DialogTitle>
          <DialogDescription className="overflow-y-auto">
            <div className="max-h-[60vh]">
              <div>
                <div className="mb-5  flex-grow px-4">
                  <label
                    htmlFor='name'
                    className="text-md mb-2 block pl-1 font-medium text-gray-900"
                  >
                    Enter Remark: 
                    <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    onChange={(e) => { handleInputChange({ remark: e.target.value })}}
                    required
                  />
                </div>
              </div>
            </div>
            <button
              onClick={async () => { isApproval ? approveProposal(data) : rejectProposal(data) }}
              className="flex ml-auto mr-5 w-fit mt-5 mb-2 md:justify-end justify-center items-center"
            >
              <span className={`flex justify-center cursor-pointer items-center gap-2 rounded-lg ${ isApproval ? 'bg-blue-500' : 'bg-red-500' } px-5 py-2 text-white shadow-md hover:shadow-[#4682B4]`}>
                { isApproval ? 'Approve' : 'Reject' }
              </span>
            </button>

            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute z-50 right-[12px] top-[12px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => setModal(false)}
            >
              <RxCross1 />
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
