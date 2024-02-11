import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { AiFillDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { IoIosAddCircle } from "react-icons/io";
import AddSociety from "../components/AddSociety";
import societies from '../../society_info'
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

export default function SocietyTable() {
  const [society, setSociety] = useState(societies);
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

  const handleFinalDelete = () => {
    setSociety((prevSociety) =>
      prevSociety.filter((society) => society.name !== currentRow.name)
    );
    setDelModal(false);
  };

  const handleEdit = (row) => {
    setEditModal(true);
    setCurrentRow(row);
  };

  const handleFinalEdit = () => {
    setEditModal(false);
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

  return (
    <div className="card rounded-md p-10" >
      <AddSociety modal={societymodal} setModal={setSocietyModal} />
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
          field="fa_uid"
          header="FA Email"
          filter
          filterPlaceholder="Search by FA Email"
        />
        <Column
          field="secretary_uid"
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
                <Button variant="destructive" onClick={handleFinalDelete}>
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
                    value = {currentRow && currentRow.name}
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
                    value = {currentRow && currentRow.budget}
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
                  onChange={(e) => handleInputChange("fa-mail", e.target.value)}
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
                  Society Secretary Email{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  onChange={(e) => handleInputChange("secretary", e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
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
