import React from "react";
import { Icon } from '@iconify/react';
import { ApplyBtn, ClearAllBtn } from "./index.styled";
import { FilterParams } from "@/types/Filter";

interface Props {
    open: boolean;
    setOpen: (v: boolean) => void;
    children: React.ReactNode;
    subChild?: React.ReactNode;
    filter: FilterParams;
    handleFilterMobile: (v: FilterParams) => void;
    handleClearAllFilter: (v: FilterParams) => void;
}

const Sidebar = ({ open, setOpen, children, subChild, handleFilterMobile, filter, handleClearAllFilter}: Props) => {

    return (
        <div>
            <div
                className={`bg-[#FFFFFF] min-h-screen ${
                open ? "w-full flex" : "w-0 hidden"
                } duration-500 text-gray-100 absolute z-[100] flex-col justify-between`}
            >
                <div>
                    <div className="py-4 flex justify-between mx-6">
                        <p className="text-[#000000] font-medium text-base">Filter</p>
                        <Icon icon="ph:x-bold" color="#9e9bae" width="14" height="14" onClick={() => setOpen(!open)}/>
                    </div>
                    <div className="border"></div>
                    {subChild}
                </div>
                <div className="text-black flex flex-row justify-between p-4">
                    <ClearAllBtn onClick={() => handleClearAllFilter(filter)}> 
                        <Icon icon="ph:x-bold" color="#9e9bae" width="14" height="14" /> 
                        <p className="ml-4">Clear all</p>
                    </ClearAllBtn>
                    <ApplyBtn onClick={() => handleFilterMobile(filter)}>
                        <p className="text-white text-sm">Apply</p>
                    </ApplyBtn>
                </div>
            </div>
            {children}
        </div>
  );
}

export default Sidebar;