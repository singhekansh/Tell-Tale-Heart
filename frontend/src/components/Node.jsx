import React from "react";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";
import { MdCancel } from "react-icons/md";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


function Node({size,data,i}) {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center">
        <div className="flex relative flex-col gap-1 border p-3 rounded-md">
          <span>Role: {data.user}</span>
          <span>Date: {data.created_at}</span>
          <div className=" absolute -top-2 -right-2">
            {data.status === "approved" ? (
              <IoCheckmarkDoneCircleSharp className="text-lg text-green-700" />
            ) : data.status === "rejected" ? (
              <MdCancel className="text-lg text-red-600" />
            ) : (
              <IoIosWarning className="text-lg text-yellow-400" />
            )}
          </div>
        </div>
        {(i < size - 1 ) ? (
          data.status == "approved" ? (
            <img
              className=" font-bold"
              src="images/iconmonstr-arrow-right-thin.svg"
            ></img>
          ) : (
            <img className="h-8 w-8" src="images/right.png"></img>
          )
        ) : (
          ""
        )}
      </PopoverTrigger>
      <PopoverContent>
        <div className="font-semibold">Remarks</div>
        <p>{data.remark}</p>
      </PopoverContent>
    </Popover>
  );
}

export default Node;
