import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Modal = ({ modal, setModal, society, addClub, data, setdata }) => {
  const [toadd, setToadd] = useState({
    name: '',
    society: '',
    budget: 0,
    fa_email: '',
    coordinator_email: ''
  });

  const handleInputChange = (value) => {
    setToadd({ ...toadd, ...value })
  };


  return (
    <Dialog open={modal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-4 px-5">Add Club</DialogTitle>
          <DialogDescription className="overflow-y-auto scrollbar">
            <div className="max-h-[60vh]">
              <div>
                <div className="mb-5 md:w-full px-4">
                  <label
                    htmlFor="subCategory"
                    className="text-md mb-2 block flex-grow pl-1 font-medium text-gray-900 "
                  >
                    Which Society it belongs to?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    onChange={(e) =>
                      handleInputChange({ society: e.target.value })
                    }
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Society</option>
                    {
                      society.map(s => 
                        <option key={s._id} value={s._id}>{ s.name }</option>  
                      )
                    }
                  </select>
                </div>
              </div>
              <div>
                <div className="mb-5  flex-grow px-4">
                  <label
                    htmlFor="name"
                    className="text-md mb-2 block pl-1 font-medium text-gray-900"
                  >
                    Name of the Club <span className="text-red-500">*</span>
                  </label>
                  <Input
                    onChange={(e) => handleInputChange({ name: e.target.value })}
                    type="text"
                    required
                  />
                </div>

                <div className="mb-5  flex-grow px-4">
                  <label
                    htmlFor="amt"
                    className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                  >
                    Budget <span className="text-red-500">*</span>
                  </label>
                  <Input
                    onChange={(e) => handleInputChange({ budget: parseInt(e.target.value) })}
                    type="Number"
                  />
                </div>
              </div>
              <div className="mb-5 flex-grow px-4">
                <label
                  htmlFor="fa-mail"
                  className="text-md mb-2 block pl-1 font-medium text-gray-900"
                >
                  Faculty Advisor's Email{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  onChange={(e) => handleInputChange({ fa_email: e.target.value })}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-5 flex-grow px-4">
                <label
                  htmlFor="club"
                  className="text-md mb-2 block pl-1 font-medium text-gray-900"
                >
                  Club's Email{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  onChange={(e) => handleInputChange({ coordinator_email: e.target.value })}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
            <div
              onClick={() => addClub(toadd)}
              className="flex w-[100%] mt-5 mb-2 md:justify-end justify-center items-center "
            >
              <span className="flex  justify-center mx-5 cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-[#4682B4]">
                Save Changes
              </span>
            </div>
            </div>

            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute z-50 right-[12px] top-[12px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => {
                setModal(false);
              }}
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
