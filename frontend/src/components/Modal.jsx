import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross1 } from "react-icons/rx";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Modal = ({ modal, setModal, data, setdata }) => {
    
    const [inpts,setInpts] = React.useState({
    title:"",
    date:"",
    bill:"",
    supplier:"",
    qty:"",
    amt:"",
    desc:"",
    cat:"",
    section:"",
    head:"",
    fund:"",
    payment:"",
    type:"",
    purpose:"",
    })

    const handleInputChange = (name, value) => {
        setInpts((prevInpts) => ({
          ...prevInpts,
          [name]: value,
        }));
      };

  return (
    <Dialog.Root open={modal}>
      {
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black opacity-50 data-[state=open]:animate-overlayShow fixed inset-0 " />
          <Dialog.Content
            className={`data-[state=open]:animate-contentShow max-xl:min-w-[90vw] max-h-[500px] overflow-scroll overflow-x-hidden fixed min-w-[800px] left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
          >
            <>
              <div className="  rounded-lg bg-white h-full w-full pb-4 shadow-md">
                <div className="border-b border-slate-200 pb-2 pl-5 pt-5 text-xl font-medium">
                  Proposal Details
                </div>
                <div>
                  <div className="mt-4 flex w-[100%] max-md:flex-col  gap-5 px-5 ">
                    <div className="mb-5 md:w-1/2">
                      <label
                        htmlFor="title"
                        className="text-md mb-2 block flex-grow   pl-1 font-medium text-gray-900 "
                      >
                        Title <span className="text-red-500">*</span>
                      </label>
                      <Input onChange={(e) => handleInputChange("title", e.target.value)} type="text"/>
                    </div>
                    <div className="mb-5 md:w-1/2">
                      <label
                        htmlFor="date"
                        className="text-md mb-2 block w-1/2 pl-1 font-medium text-gray-900 "
                      >
                        Date <span className="text-red-500">*</span>
                      </label>
                      <Input onChange={(e) => handleInputChange("date", e.target.value)}  type="Date"/>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-4 flex w-[100%] max-lg:flex-col  gap-5 px-5 ">
                    <div className="mb-5  md:max-w-[50%] flex-grow">
                      <label
                        htmlFor="bill"
                        className="text-md mb-2 block pl-1 font-medium text-gray-900 "
                      >
                        Bill Number
                      </label>
                      <Input onChange={(e) => handleInputChange("bill", e.target.value)} type="Number"/>
                    </div>
                    <div className="mb-5 flex-grow">
                      <label
                        htmlFor="supplier"
                        className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                      >
                        Supplier Name <span className="text-red-500">*</span>
                      </label>
                      <Input onChange={(e) => handleInputChange("supplier", e.target.value)} type="text"/>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex w-[100%] max-lg:flex-col  gap-5 px-5 ">
                  <div className="mb-5 flex-grow">
                    <label
                      htmlFor="qty"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Quantity
                    </label>
                    <Input onChange={(e) => handleInputChange("qty", e.target.value)} type="Number"/>
                  </div>
                  <div className="mb-5 flex-grow">
                    <label
                      htmlFor="amt"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Amount
                    </label>
                    <Input onChange={(e) => handleInputChange("amt", e.target.value)} type="Number"/>
                  </div>
                </div>
                <div className="mt-4 w-[100%] flex-col  gap-5 px-5 ">
                    <label
                      htmlFor="qty"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Description of Item
                    </label>
                    <Textarea onChange={(e) => handleInputChange("desc", e.target.value)} />
                </div>
                <div className="mt-4 flex w-[100%] max-lg:flex-col  gap-5 px-5 ">
                  <div className="mb-5 flex-grow">
                    <label
                      htmlFor="cat"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Sub Category
                    </label>
                    <Input onChange={(e) => handleInputChange("cat", e.target.value)} type="text"/>
                  </div>
                  <div className="mb-5 flex-grow">
                    <label
                      htmlFor="section"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Section
                    </label>
                    <Input onChange={(e) => handleInputChange("section", e.target.value)} type="text"/>
                  </div>
                </div>
                <div className="mt-4 flex w-[100%] max-lg:flex-col  gap-5 px-5 ">
                  <div className="mb-5 flex-grow">
                    <label
                      htmlFor="head"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Budget Head
                    </label>
                    <Input onChange={(e) => handleInputChange("head", e.target.value)} type="text"/>
                  </div>
                  <div className="mb-5 flex-grow">
                    <label
                      htmlFor="fund"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Fund
                    </label>
                    <Input onChange={(e) => handleInputChange("fund", e.target.value)} type="text"/>
                  </div>
                </div>
                <div className="mt-4 flex w-[100%] max-lg:flex-col  gap-5 px-5 ">
                  <div className="mb-5 flex-grow">
                    <label
                      htmlFor="pass of payment"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Passed of Payment
                    </label>
                    <Input onChange={(e) => handleInputChange("payment", e.target.value)} type="text"/>
                  </div>
                  <div className="mb-5 flex-grow">
                    <label
                      htmlFor="fund"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Bill Settlement Type
                    </label>
                    <Input onChange={(e) => handleInputChange("type", e.target.value)} type="text"/>
                  </div>
                </div>
                <div className="mt-4 w-[100%] flex-col  gap-5 px-5 ">
                    <label
                      htmlFor="qty"
                      className="text-md mb-2 block  pl-1 font-medium text-gray-900 "
                    >
                      Purpose of Proposal
                    </label>
                    <Textarea onChange={(e) => handleInputChange("purpose", e.target.value)} />
                </div>
                <div className="flex w-[100%] max-lg:flex-col mt-5 md:justify-end justify-center items-center pr-5">
                  <span className="flex  justify-center mx-5 cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                    Save Changes
                  </span>
                </div>
              </div>
            </>

            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[0px] top-[5px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                onClick={() => {
                  setModal(false);
                }}
              >
                <RxCross1 />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      }
    </Dialog.Root>
  );
};

export default Modal;
