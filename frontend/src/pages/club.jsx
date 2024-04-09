import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { AiFillDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { IoIosAddCircle } from "react-icons/io";
import AddClub from "../components/AddClub";
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
import { useClubStore } from "@/store/clubStore";
import { ApiWithAuth } from "@/lib/axios";
import { useUserStore } from "@/store/userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const validateData = (data) => {
  console.log(data);
  if (data.society?.length === 0) return "Please select a society";
  if (data.name?.length === 0) return "Please enter valid club name";
  if (data.budget <= 0) return "Please enter valid budget";
  if (data.fa_email?.length === 0) return "Please enter Club FA email";
  if (data.coordinator_email?.length === 0)
    return "Please enter Coordinator email";
  return null;
};

export default function ClubTable() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/?redirect=club");
    }
  }, [user, navigate]);

  const [club, setClub] = useState([]);
  const [society, setSociety] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);

  const renderUpdateColumn = (rowData) => {
    return (
      <div className="flex text-xl gap-2">
        <AiFillDelete
          style={{ cursor: "pointer", color: "red" }}
          onClick={() => handleDelete(rowData)}
        />
        <TiEdit
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => handleEdit(rowData)}
        />
      </div>
    );
  };
  const [delModal, setDelModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const handleDelete = (row) => {
    setDelModal(true);
    setCurrentRow(row);
  };

  const handleEdit = (row) => {
    setEditModal(true);
    setCurrentRow(row);
  };

  const handleInputChange = (key, data) => {
    let newrow = { ...currentRow };
    newrow[key] = data;
    setCurrentRow(newrow);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
    name: { value: null },
    society: { value: null },
    budget: { value: null },
    spent: { value: null },
    fa_uid: { value: null },
    coordi_uid: { value: null },
    update: { value: null },
  });

  const renderHeader = () => {
    return (
      <div className="flex justify-between pr-5">
        <input
          type="text"
          value={filters.global.value || ""}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          placeholder="Global Search"
          className="p-inputtext p-component p-filled px-3"
        />
        <div
          onClick={() => setClubModal(true)}
          className=" flex flex-col items-center justify-center cursor-pointer text-blue-500 text-4xl"
        >
          <IoIosAddCircle />
          <span className="text-black text-sm">Add New Club</span>
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

  const [clubmodal, setClubModal] = useState(false);

  const getSocieties = async () => {
    try {
      const societies = (await ApiWithAuth.get("/society")).data.data;
      console.log("GET /society: ", societies);
      setSociety(societies);
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error("GET /society: ", error);
    }
  };

  const getClubs = async () => {
    try {
      const clubs = (await ApiWithAuth.get("/club")).data.data;
      console.log("GET /club: ", clubs);
      setClub(clubs);
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error("GET /club: ", error);
    }
  };

  const addClub = async (data) => {
    const error = validateData(data);
    if (error) return toast({ title: error });

    try {
      const newClub = (await ApiWithAuth.post("/club", data)).data.data;
      console.log("POST /club: ", newClub);
      getClubs();
      // setClub([newClub, ...club])
      setClubModal(false);
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error("POST /club: ", error);
      toast({
        title: "Failed to create new club",
        description: error,
      });
    }
  };

  const editClub = async () => {
    console.log("currentRow: ", currentRow);
    const id = currentRow._id;
    const data = currentRow;
    try {
      console.log(data);
      const updatedClub = (await ApiWithAuth.put(`/club/${id}`, data)).data
        .data;
      console.log("PUT /club: ", updatedClub);
      getClubs();
      // setClub([
      //   updatedClub,
      //   ...club.filter((s) => s._id !== id),
      // ])
      setEditModal(false);
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error("PUT /club: ", error);
      toast({
        title: "Failed to update club",
        description: error,
      });
    }
  };

  const deleteClub = async () => {
    const id = currentRow._id;
    try {
      const deleteClub = await ApiWithAuth.delete(`/club/${id}`);
      console.log("DELETE /club: ", deleteClub);
      setClub([...club.filter((s) => s._id !== id)]);
      setDelModal(false);
    } catch (err) {
      let error = err?.response?.data?.message || err.message;
      console.error("DELETE /club: ", error);
      toast({
        title: "Failed to delete club",
        description: error,
      });
    }
  };

  useEffect(() => {
    getClubs();
    getSocieties();
  }, []);

  return (
    <div className="card rounded-md p-10">
      <AddClub
        modal={clubmodal}
        setModal={setClubModal}
        society={society}
        addClub={addClub}
      />
      <DataTable
        className=" rounded-md"
        value={club}
        dataKey="id"
        filters={filters}
        header={renderHeader}
        emptyMessage="No club found."
      >
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
        />
        <Column
          field="society.name"
          header="Society"
          filter
          filterPlaceholder="Search by society"
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
          field="coordinator_email"
          header="Coordinator Email"
          filter
          filterPlaceholder="Search by Coordinator Email"
        />
        <Column field="Update" header="Update" body={renderUpdateColumn} />
      </DataTable>

      <Dialog open={delModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-4">
              Are you sure you want to delete this Club ?
            </DialogTitle>
            <DialogDescription className="overflow-y-auto  max-h-[500px]">
              <div className="flex gap-3">
                <Button variant="destructive" onClick={deleteClub}>
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
            <DialogTitle className="pb-4">Edit Club Details</DialogTitle>
            <DialogDescription className="overflow-y-auto scrollbar  max-h-[500px]">
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
                      <option value="">
                        {currentRow ? currentRow.society.name : ""}
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="mb-5 flex-grow px-4">
                    <label
                      htmlFor="name"
                      className="text-md mb-2 block pl-1 font-medium text-gray-900"
                    >
                      Name of the Club <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={currentRow && currentRow.name}
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
                      value={currentRow && currentRow.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
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
                      handleInputChange("fa_email", e.target.value)
                    }
                    value={currentRow?.fa_email}
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
                      handleInputChange("coordinator_email", e.target.value)
                    }
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={currentRow?.coordinator_email}
                  />
                </div>
                <div
                  className="flex w-[100%] mt-5 mb-2 md:justify-end justify-center items-center pr-5"
                  onClick={editClub}
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
