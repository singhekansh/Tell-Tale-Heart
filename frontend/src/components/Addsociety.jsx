import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Modal = ({ modal, setModal, data, setdata }) => {
  const [inpts, setInpts] = React.useState({
    title: "",
    date: "",
    bill: "",
    supplier: "",
    qty: "",
    amt: "",
    desc: "",
    cat: "",
    section: "",
    head: "",
    fund: "",
    payment: "",
    type: "",
    purpose: "",
  });

  const handleInputChange = (name, value) => {
    if (name === "category") setToadd(value);
    setInpts((prevInpts) => ({
      ...prevInpts,
      [name]: value,
    }));
  };

  const [toadd, setToadd] = React.useState(null);

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-4">Add Club / Society</DialogTitle>
          <DialogDescription className="overflow-y-auto scrollbar">
            <div className="mb-5 md:w-full px-4 mt-4">
              <label
                htmlFor="category"
                className="text-md mb-2 block flex-grow pl-1 font-medium text-gray-900"
              >
                New Club or Society <span className="text-red-500">*</span>
              </label>
              <select
                onChange={(e) => handleInputChange("category", e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select category</option>
                <option value="Club">Club</option>
                <option value="Society">Society</option>
              </select>
            </div>
            {toadd === "Club" ? (
              // To add club
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
                        handleInputChange("subCategory", e.target.value)
                      }
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Society</option>
                      <option value="Literary">Literary Society</option>
                      <option value="Sports">Sports Society</option>
                      <option value="Cultural">Cultural Society</option>
                      <option value="Technical">Technical Society</option>
                      <option value="Technical">Research Society</option>
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
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
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
                      onChange={(e) => handleInputChange("amt", e.target.value)}
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
                    onChange={(e) =>
                      handleInputChange("fa-mail", e.target.value)
                    }
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-5 flex-grow px-4">
                  <label
                    htmlFor="coordi"
                    className="text-md mb-2 block pl-1 font-medium text-gray-900"
                  >
                    Club Co-ordinator's Email{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    onChange={(e) =>
                      handleInputChange("coordi", e.target.value)
                    }
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="flex w-[100%] max-lg:flex-col mt-5 md:justify-end justify-center items-center pr-5 mb-10">
                  <span className="flex  justify-center mx-5 cursor-pointer items-center gap-2 rounded-lg bg-[#0065C1] px-5 py-2 text-white shadow-md hover:shadow-blue-400">
                    Save Changes
                  </span>
                </div>
                <div className="h-1"></div>
              </div>
            ) : toadd === "Society" ? (
              // for society
              <div className="max-h-[60vh]">
                <div>
                  <div className="mb-5  flex-grow px-4">
                    <label
                      htmlFor="name"
                      className="text-md mb-2 block pl-1 font-medium text-gray-900"
                    >
                      Name of the Society
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
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
                      onChange={(e) => handleInputChange("amt", e.target.value)}
                      type="Number"
                    />
                  </div>
                </div>
                <div className="mb-5  flex-grow px-4">
                  <label
                    htmlFor="fa-mail"
                    className="text-md mb-2 block pl-1 font-medium text-gray-900"
                  >
                    Faculty Advisor's Email{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    onChange={(e) =>
                      handleInputChange("fa-mail", e.target.value)
                    }
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-5 flex-grow  px-4">
                  <label
                    htmlFor="coordi"
                    className="text-md mb-2 block pl-1 font-medium text-gray-900"
                  >
                    Club Co-ordinator's Email{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    onChange={(e) =>
                      handleInputChange("coordi", e.target.value)
                    }
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="flex w-[100%] my-5 md:justify-end justify-center items-center pr-5">
                  <span className="flex  justify-center mx-5 cursor-pointer items-center gap-2 rounded-lg bg-[#4682B4] px-5 py-2 text-white shadow-md hover:shadow-[#4682B4]">
                    Save Changes
                  </span>
                </div>
                <div className="h-1"></div>
              </div>
            ) : (
              ""
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
