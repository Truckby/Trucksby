import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";

const FilterComponent = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-[274px] bg-white p-[21px] rounded-[11px] shadow">
      {/* Listing Type */}
      <FilterSection title="Listing Type" isOpen={openSections.listingType} toggle={() => toggleSection("listingType")}>
        <Checkbox label="For Sale" />
        <Checkbox label="For Lease" />
        <Checkbox label="For Auction" />
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category" isOpen={openSections.category} toggle={() => toggleSection("category")}>
        <Checkbox label="For Sale" />
        <Checkbox label="For Lease" />
        <Checkbox label="For Auction" />
      </FilterSection>

      {/* Manufacturer */}
      <FilterSection title="Manufacturer" isOpen={openSections.manufacturer} toggle={() => toggleSection("manufacturer")}>
        <SearchInput placeholder="Search Manufacturer" />
        <Checkbox label="Hyundia" />
        <Checkbox label="KIA" />
        <Checkbox label="Isuzu" />
        <Checkbox label="Mitsubishi" />
        <Checkbox label="Hino" />
      </FilterSection>

      {/* Year Range */}
      <FilterSection title="Year" isOpen={openSections.year} toggle={() => toggleSection("year")}>
        <RangeInput />
      </FilterSection>

      <FilterSection title="Gross Vehicle Weight" isOpen={openSections.vehicle} toggle={() => toggleSection("vehicle")}>
        <Checkbox label="Heavy Weight" />
        <Checkbox label="Class 7" />
        <Checkbox label="Class 8" />
      </FilterSection>

      {/* Mileage */}
      <FilterSection title="Mileage" isOpen={openSections.mileage} toggle={() => toggleSection("mileage")}>
        <RangeInput />
      </FilterSection>

      {/* Engine Manufacturer */}
      <FilterSection title="Manufacturer" isOpen={openSections.engine} toggle={() => toggleSection("engine")}>
        <SearchInput placeholder="Search Engine Manufacturer" />
        <Checkbox label="Hyundia" />
        <Checkbox label="KIA" />
        <Checkbox label="Isuzu" />
        <Checkbox label="Mitsubishi" />
      </FilterSection>

      {/* Horsepower */}
      <FilterSection title="Horsepower" isOpen={openSections.horsepower} toggle={() => toggleSection("horsepower")}>
        <RangeInput />
      </FilterSection>

      <FilterSection title="Wheelbase" isOpen={openSections.wheelbase} toggle={() => toggleSection("wheelbase")}>
        <RangeInput />
      </FilterSection>

      <FilterSection title="Suspension" isOpen={openSections.suspension} toggle={() => toggleSection("suspension")}>
        <SearchInput placeholder="Search Suspension" />
        <Checkbox label="Air Ride" />
        <Checkbox label="Flex Air" />
      </FilterSection>

      {/* Transmission */}
      <FilterSection title="Transmission" isOpen={openSections.transmission} toggle={() => toggleSection("transmission")}>
        <Checkbox label="Automatic" />
        <Checkbox label="Manual" />
      </FilterSection>
    </div>
  );
};

const FilterSection = ({ title, isOpen, toggle, children }) => {
  return (
    <div className="pb-6">
      <button className="w-full flex justify-between items-center font-semibold" onClick={toggle}>
        {title}
        <span >{isOpen ? <FaChevronUp /> : <FaAngleDown />}</span>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const Checkbox = ({ label }) => (
  <label className="flex mb-[8px] items-center cursor-pointer">
    <input
      type="checkbox"
      className="h-[14px] w-[14px] accent-[#DF0805] mr-[13px] border-gray-300 rounded"
    />
    <span className="text-sm">{label}</span>
  </label>
);


const SearchInput = ({ placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full h-[45px] p-2 text-sm border-none outline-none shadow mb-6 rounded-[4px] mt-2"
  />
);

const RangeInput = () => (
  <div className="flex gap-3 text-sm mt-2">
    <input type="number" placeholder="Min" className="w-[63px] h-[45px] p-2 shadow border-none outline-none rounded-md" />
    <input type="number" placeholder="Max" className="w-[63px] h-[45px] p-2 shadow border-none outline-none rounded-md" />
    <button className="bg-black h-[45px] w-[75px] text-white p-2 rounded-md">Search</button>
  </div>
);

export default FilterComponent;
