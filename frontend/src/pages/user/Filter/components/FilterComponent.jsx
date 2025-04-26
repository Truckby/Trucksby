import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CountryDropdown } from "react-country-region-selector";

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

    <div className="">
      {selectedFilters.length > 0 && (
        <div className="mb-4 p-3 py-4 md:w-[274px] bg-white shadow rounded-[11px]">
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
                  <IoMdClose className="text-black p-[1px] bg-white rounded-full" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="md:w-[274px] bg-white pr-2 md:p-[21px] rounded-[11px] md:shadow h-[95vh] md:h-full overflow-y-auto ">
        {/* Listing Type */}
        <FilterSection title="Listing Type" isOpen={openSections.listingType} toggle={() => toggleSection("listingType")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Sale" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Lease" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="For Auction" />
        </FilterSection>

        {/* Category */}
        <FilterSection title="Category" isOpen={openSections.category} toggle={() => toggleSection("category")}>
          <SelectBox
            options={["Flatbed", "Refrigerated", "Dry Van", 'Tanker', 'Lowboy', 'Box Truck']}
            onChange={handleCheckboxChange}
          />
        </FilterSection>

        {/* Manufacturer */}
        <FilterSection title="Manufacturer" isOpen={openSections.manufacturer} toggle={() => toggleSection("manufacturer")}>
          <SelectBox
            options={["Hyundia", "KIA", "Isuzu", 'Mitsubishi', 'Hino']}
            onChange={handleCheckboxChange}
          />
        </FilterSection>

        {/* Year Range */}
        <FilterSection title="Year" isOpen={openSections.year} toggle={() => toggleSection("year")}>
          <RangeInput />
        </FilterSection>

        {/* Mileage */}
        <FilterSection title="Mileage" isOpen={openSections.mileage} toggle={() => toggleSection("mileage")}>
          <RangeInput />
        </FilterSection>

        {/* Engine Manufacturer */}
        <FilterSection title="Engine Manufacturer" isOpen={openSections.engine} toggle={() => toggleSection("engine")}>
          <SearchInput placeholder="Search Engine Manufacturer" />
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

        {/* Transmission */}
        <FilterSection title="Transmission" isOpen={openSections.transmission} toggle={() => toggleSection("transmission")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Automatic" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Manual" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Semi Auto" />
        </FilterSection>

        <FilterSection title="Number of Speeds" isOpen={openSections.NumberofSpeeds} toggle={() => toggleSection("NumberofSpeeds")}>
          <SearchInput placeholder="Search Speed" />
        </FilterSection>

        <FilterSection title="Condition" isOpen={openSections.condition} toggle={() => toggleSection("condition")}>
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="New" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Used" />
          <Checkbox onChange={handleCheckboxChange} selected={selectedFilters} label="Salvaged" />
        </FilterSection>

        <FilterSection title="Country" isOpen={openSections.Country} toggle={() => toggleSection("Country")}>
          <CountryDropdown
            value={''}
            onChange={handleCheckboxChange}
            className='input'
          />
        </FilterSection>
      </div>
    </div>
  );
};

const SelectBox = ({ options, onChange }) => (
  <select
    className="w-full h-[45px] p-2 text-sm border-none outline-none shadow mb-6 rounded-[4px] mt-2"
    onChange={(e) => {
      if (e.target.value) {
        onChange(e.target.value);
      }
    }}
    defaultValue=""
  >
    <option value="" disabled>Select an option</option>
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);


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
