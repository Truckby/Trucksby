import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const FilterComponent = () => {
  const [openSections, setOpenSections] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const removeFilter = (filter) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== filter));
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  return (

    <div>
      {selectedFilters.length > 0 && (
        <div className="mb-4 p-3 py-4 w-[274px] bg-white shadow rounded-[11px]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Applied Filters</span>
            <button onClick={clearAllFilters} className="text-red-600 text-sm">
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center bg-[#333333] text-white px-2 py-1 rounded-[5px] text-[13px]"
              >
                {filter}
                <button
                  className="ml-2"
                  onClick={() => removeFilter(filter)}
                >
                  <IoMdClose  className="text-black p-[1px] bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-[274px] bg-white p-[21px] rounded-[11px] shadow">
        {/* Listing Type */}
        <FilterSection title="Listing Type" isOpen={openSections.listingType} toggle={() => toggleSection("listingType")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Sale" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Lease" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Auction" />
        </FilterSection>

        {/* Category */}
        <FilterSection title="Category" isOpen={openSections.category} toggle={() => toggleSection("category")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Sale1" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Lease1" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Auction1" />
        </FilterSection>

        {/* Manufacturer */}
        <FilterSection title="Manufacturer" isOpen={openSections.manufacturer} toggle={() => toggleSection("manufacturer")}>
          <SearchInput placeholder="Search Manufacturer" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Hyundia" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="KIA" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Isuzu" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Mitsubishi" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Hino" />
        </FilterSection>

        {/* Year Range */}
        <FilterSection title="Year" isOpen={openSections.year} toggle={() => toggleSection("year")}>
          <RangeInput />
        </FilterSection>

        <FilterSection title="Gross Vehicle Weight" isOpen={openSections.vehicle} toggle={() => toggleSection("vehicle")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Heavy Weight" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Class 7" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Class 8" />
        </FilterSection>

        {/* Mileage */}
        <FilterSection title="Mileage" isOpen={openSections.mileage} toggle={() => toggleSection("mileage")}>
          <RangeInput />
        </FilterSection>

        {/* Engine Manufacturer */}
        <FilterSection title="Manufacturer" isOpen={openSections.engine} toggle={() => toggleSection("engine")}>
          <SearchInput placeholder="Search Engine Manufacturer" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Hyundia" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="KIA" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Isuzu" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Mitsubishi" />
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
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Air Ride" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Flex Air" />
        </FilterSection>

        <FilterSection title="Suspension" isOpen={openSections.suspension} toggle={() => toggleSection("suspension")}>
          <SearchInput placeholder="Search Suspension" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Air Ride" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Flex Air" />
        </FilterSection>

        <FilterSection title="Number of Rear Axel" isOpen={openSections.axel} toggle={() => toggleSection("axel")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Sale" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Lease" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Auction" />
        </FilterSection>

        <FilterSection title="Front Axle Weight" isOpen={openSections.FrontAxleWeight} toggle={() => toggleSection("FrontAxleWeight")}>
          <RangeInput />
        </FilterSection>

        <FilterSection title="Back Axle Weight" isOpen={openSections.BackAxleWeight} toggle={() => toggleSection("BackAxleWeight")}>
          <RangeInput />
        </FilterSection>

        <FilterSection title="Gross Vehicle Weight" isOpen={openSections.GrossVehicleWeight} toggle={() => toggleSection("GrossVehicleWeight")}>
          <RangeInput />
        </FilterSection>

        {/* Transmission */}
        <FilterSection title="Transmission" isOpen={openSections.transmission} toggle={() => toggleSection("transmission")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Automatic" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Manual" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Semi Auto" />
        </FilterSection>

        <FilterSection title="Number of Speeds" isOpen={openSections.NumberofSpeeds} toggle={() => toggleSection("NumberofSpeeds")}>
          <SearchInput placeholder="Search Speed" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="7 spd" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="8 spd" />
        </FilterSection>

        <FilterSection title="Condition" isOpen={openSections.condition} toggle={() => toggleSection("condition")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="New" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Used" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Salvaged" />
        </FilterSection>

        <FilterSection title="State" isOpen={openSections.State} toggle={() => toggleSection("State")}>
          <SearchInput placeholder="Search State" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Alabama" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Arizona" />
        </FilterSection>
      </div>
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

const Checkbox = ({ label, onChange, selected }) => (
  <label className="flex mb-2 items-center cursor-pointer">
    <input
      type="checkbox"
      checked={selected.includes(label)}
      onChange={() => onChange(label)}
      className="h-[14px] w-[14px] accent-[#DF0805] mr-2 border-gray-300 rounded"
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
