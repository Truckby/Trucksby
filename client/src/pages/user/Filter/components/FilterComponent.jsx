import React, { useState } from "react";

const FilterComponent = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-[274px] bg-white p-4 border rounded-lg shadow-md">
      {/* Listing Type */}
      <FilterSection title="Listing Type" isOpen={openSections.listingType} toggle={() => toggleSection("listingType")}>
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" />
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category" isOpen={openSections.category} toggle={() => toggleSection("category")}>
        <Checkbox label="Category 1" />
        <Checkbox label="Category 2" />
      </FilterSection>

      {/* Manufacturer */}
      <FilterSection title="Manufacturer" isOpen={openSections.manufacturer} toggle={() => toggleSection("manufacturer")}>
        <SearchInput placeholder="Search Manufacturer" />
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
    <div className="border-b py-2">
      <button className="w-full flex justify-between items-center font-semibold" onClick={toggle}>
        {title}
        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

const Checkbox = ({ label }) => (
  <label className="flex items-center space-x-2 text-gray-700">
    <input type="checkbox" className="h-4 w-4 border-gray-300" />
    <span>{label}</span>
  </label>
);

const SearchInput = ({ placeholder }) => (
  <input
    type="text"
    placeholder={placeholder}
    className="w-full p-2 border rounded-md text-gray-700 mt-2"
  />
);

const RangeInput = () => (
  <div className="flex gap-2 mt-2">
    <input type="number" placeholder="Min" className="w-1/2 p-2 border rounded-md" />
    <input type="number" placeholder="Max" className="w-1/2 p-2 border rounded-md" />
    <button className="bg-blue-500 text-white p-2 rounded-md">Search</button>
  </div>
);

export default FilterComponent;
