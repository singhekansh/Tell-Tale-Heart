import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { AiFillDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { IoIosAddCircle } from "react-icons/io";
import AddSociety from "../components/AddSociety";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RxCross1 } from "react-icons/rx";
import { ApiWithAuth } from "@/lib/axios";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast";

const validateData = (data) => {
  if (data.name?.length === 0) return "Please enter valid Society Name."
  if (data.budget <= 0) return "Please enter valid budget value."
  if (data.fa_email?.length === 0) return "Please enter society FA email."
  if (data.secretary_email?.length === 0) return "Please enter society secretary email."
  return null
}



export default function SocietyTable() {
  const user = useUserStore(state => state.user)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!user) {
      navigate('/?redirect=society')
    }
  }, [user, navigate])
  
  const [society, setSociety] = useState([]);
  const [currentRow, setCurrentRow] = useState({});
  
  const renderUpdateColumn = (rowData) => {
    return (
      <div className="flex text-xl gap-2">
        <AiFillDelete
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => handleDeleteClick(rowData)}
          />
        <TiEdit
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => handleEditClick(rowData)}
          />
      </div>
    );
  };
  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  
  const handleInputChange = (key, data) => {
    let newrow = { ...currentRow };
    newrow[key] = data;
    setCurrentRow(newrow)
  }

  const handleDeleteClick = (row) => {
    setCurrentRow(row);
    setDelModal(true);
  };

  const handleEditClick = (row) => {
    setCurrentRow(row);
    setEditModal(true);
  };


  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    name: { value: null },
    budget: { value: null },
    spent: { value: null },
    fa_uid: { value: null },
    secretary_uid: { value: null },
    update: { value: null },
  });

  const renderHeader = () => {
    return (
      <div className="flex justify-between pr-7">
        <input
          type="text"
          value={filters.global.value || ""}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          placeholder="Global Search"
          className="p-inputtext px-3 p-component p-filled"
        />
        <div
          onClick={() => setSocietyModal(true)}
          className=" flex flex-col items-center justify-center cursor-pointer text-blue-500 text-4xl"
        >
          <IoIosAddCircle />
          <span className="text-black text-sm">Add New Society</span>
        </div>
      </div>
    );
  };

  const onGlobalFilterChange = (value) => {
    setFilters((prevFilters) => {
      const _filters = { ...prevFilters };
      if (_filters.global) {
        _filters.global.value = value;
      }
      return _filters;
    });
  };

  const renderStatus = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const getSeverity = (status) => {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;

      default:
        return null;
    }
  };

  const [societymodal, setSocietyModal] = useState(false);

  const getSocieties = async () => {
    try {
      const societies = (await ApiWithAuth.get('/society')).data.data
      console.log("GET /society: ", societies)
      setSociety(societies)
    } catch (err) {
      let error = err?.response?.data?.message || err.message
      console.error('GET /society: ', error)
    }
  }

  const addSociety = async (data) => {
    const error = validateData(data)
    if (error) return toast({ title: error })

    try {
      const newSociety = (await ApiWithAuth.post('/society', data)).data.data
      console.log('POST /society: ', newSociety)
      setSociety([newSociety, ...society])
      setSocietyModal(false)
    } catch (err) {
      let error = err?.response?.data?.message || err.message
      console.error('POST /society: ', error)
      toast({
        title: "Failed to create new society",
        description: error
      })
    }
  }

  const editSociety = async () => {
    const id = currentRow._id;
    const data = currentRow;
    try {
      const updatedSociety = (await ApiWithAuth.put(`/society/${id}`, data)).data.data
      console.log('PUT /society: ', updatedSociety)
      setSociety([
        updatedSociety,
        ...society.filter((s) => s._id !== id),
      ])
      setEditModal(false)
    } catch (err) {
      let error = err?.response?.data?.message || err.message
      console.error('PUT /society: ', error)
      toast({
        title: "Failed to update society",
        description: error
      })
    }
  }

  const deleteSociety = async () => {
    const id = currentRow._id
    try {
      await ApiWithAuth.delete(`/society/${id}`)
      setSociety([
        ...society.filter((s) => s._id !== id),
      ])
      setDelModal(false)
    } catch (err) {
      let error = err?.response?.data?.message || err.message
      console.error('DELETE /society: ', error)
      toast({
        title: "Failed to delete society",
        description: error
      })
    }
  }

  useEffect(() => {
    getSocieties()
  }, [])

  return (
    <div className="card rounded-md p-10" >
      <AddSociety modal={societymodal} setModal={setSocietyModal} addSociety={addSociety} />
      <DataTable
        value={society}
        dataKey="id"
        filters={filters}
        header={renderHeader}
        emptyMessage="No society found."
      >
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="budget"
          header="Budget"
          filter
          filterPlaceholder="Search by budget"
        />
        <Column
          field="spent"
          header="Spent"
          filter
          filterPlaceholder="Search by spent"
        />
        <Column
          field="fa_email"
          header="FA Email"
          filter
          filterPlaceholder="Search by FA Email"
        />
        <Column
          field="secretary_email"
          header="Secretary Email"
          filter
          filterPlaceholder="Search by Secretary Email"
        />
        <Column field="Update" header="Update" body={renderUpdateColumn} />
      </DataTable>

      <Dialog open={delModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-4">
              Are you sure you want to delete this Society ?
            </DialogTitle>
            <DialogDescription className="overflow-y-auto  max-h-[500px]">
              <div className="flex gap-3">
                <Button variant="destructive" onClick={deleteSociety}>
                  Yes
                </Button>
                <Button variant="secondary" onClick={() => setEditModal(false)}>
                  No
                </Button>
              </div>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute z-50 right-[12px] top-[12px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                onClick={() => {
                  setDelModal(false);
                }}
              >
                <RxCross1 />
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={editModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-4">
              Edit Society Details
            </DialogTitle>
            <DialogDescription className="overflow-y-auto scrollbar  max-h-[500px]">
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
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      type="text"
                      required
                      value={currentRow?.name}
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
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      type="Number"
                      value={currentRow && currentRow.budget}
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
                    onChange={(e) => handleInputChange("fa_email", e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={currentRow?.fa_email}
                  />
                </div>
                <div className="mb-5 flex-grow  px-4">
                  <label
                    htmlFor="coordi"
                    className="text-md mb-2 block pl-1 font-medium text-gray-900"
                  >
                    Society Secretary Email{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    onChange={(e) => handleInputChange("secretary_email", e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={currentRow?.secretary_email}
                  />
                </div>
                <Button variant="default" className="bg-[#0065C1] flex ml-auto mr-10" onClick={editSociety}>
                  Save Changes
                </Button>
              </div>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute z-50 right-[12px] top-[12px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
                onClick={() => {
                  setEditModal(false);
                }}
              >
                <RxCross1 />
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
