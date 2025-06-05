import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CountryDropdown } from "react-country-region-selector";
import { useSearchParams } from 'react-router-dom';
import { truckSubCategories } from "../../../../data/Content";

const FilterComponent = ({ onFilterChange, filters, setFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [openSections, setOpenSections] = useState({
    listingType: false,
    category: false,
    engineModel: false,
    subCategory: false,
    vehicleManufacturer: false,
    year: false,
    mileage: false,
    engine: false,
    horsepower: false,
    wheelbase: false,
    suspension: false,
    axel: false,
    FrontAxleWeight: false,
    BackAxleWeight: false,
    transmissionType: false,
    noofSpeeds: false,
    condition: false,
    typeofRearAxles: false
  });

  const groupedRanges = new Set();

  const displayedFilters = Object.entries(filters)
    .filter(([_, value]) =>
      value !== '' &&
      value !== undefined &&
      !(Array.isArray(value) && value.length === 0)
    )
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        // Show each selected value as a separate filter
        return value.map(val => `${key}: ${val}`);
      }
      if (key.startsWith("min") || key.startsWith("max")) {
        const base = key.replace(/^min|^max/, "");
        if (groupedRanges.has(base)) return [];
        groupedRanges.add(base);

        const min = filters[`min${base}`];
        const max = filters[`max${base}`];
        if (min || max) return [`${base}: ${min || 'Any'}-${max || 'Any'}`];
        return [];
      }
      return [`${key}: ${value}`];
    })
    .filter(Boolean);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilterAndParams = (newValues) => {
    const newFilters = { ...filters, ...newValues };
    setFilters(newFilters);

    const updatedParams = new URLSearchParams(searchParams.toString());
    for (const key in newValues) {
      const value = newValues[key];
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    }
    setSearchParams(updatedParams, { replace: true });
  };

  const handleCheckboxChange = (category, value) => {
    updateFilterAndParams({ [category]: value });
  };

  const handleRangeChange = (category, min, max) => {
    const capitalized = category.charAt(0).toUpperCase() + category.slice(1).replace(/\s/g, '');
    const minKey = `min${capitalized}`;
    const maxKey = `max${capitalized}`;
    updateFilterAndParams({ [minKey]: min || '', [maxKey]: max || '' });
  };

  const handleTextInputChange = (category, value) => {
    updateFilterAndParams({ [category]: value || '' });
  };

  const removeFilter = (filterLabel) => {
    const [rawKey, rawValue] = filterLabel.split(':').map(str => str.trim());
    const baseKey = rawKey.replace(/\s+/g, '');
    const minKey = `min${baseKey}`;
    const maxKey = `max${baseKey}`;

    const updatedFilters = { ...filters };
    const updatedParams = new URLSearchParams(searchParams.toString());

    if (minKey in filters || maxKey in filters) {
      delete updatedFilters[minKey];
      delete updatedFilters[maxKey];
      updatedParams.delete(minKey);
      updatedParams.delete(maxKey);
    } else if (Array.isArray(filters[rawKey]) || Array.isArray(filters[baseKey])) {
      // Remove only the selected value from the array
      const key = filters[rawKey] ? rawKey : baseKey;
      const newArr = (filters[key] || []).filter(val => val !== rawValue);
      updatedFilters[key] = newArr;
      if (newArr.length === 0) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, newArr.join(','));
      }
    } else {
      const formattedKey = rawKey.charAt(0).toLowerCase() + rawKey.slice(1).replace(/\s+/g, '');
      delete updatedFilters[formattedKey];
      updatedParams.delete(formattedKey);
    }

    setFilters(updatedFilters);
    setSearchParams(updatedParams, { replace: true });
  };

  const clearAllFilters = () => {
    const cleared = {
      listingType: '',
      truckCategory: '',
      vehicleManufacturer: '',
      minYear: '',
      maxYear: '',
      minMileage: '',
      maxMileage: '',
      engineManufacturer: '',
      minHorsepower: '',
      maxHorsepower: '',
      minWheelbase: '',
      maxWheelbase: '',
      suspension: '',
      rearAxles: '',
      minFrontAxleWeight: '',
      maxFrontAxleWeight: '',
      minBackAxleWeight: '',
      maxBackAxleWeight: '',
      transmissionType: '',
      noofSpeeds: '',
      condition: '',
      country: '',
      typeofRearAxles: '',
    };
    setFilters(cleared);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  useEffect(() => {
    if (onFilterChange) onFilterChange(filters);
  }, [filters, onFilterChange]);

  const truckCategory = [
    'Trucks',
    'Trailers',
    'Construction Equipment',
    'Logging Equipment',
    'Farm Equipment',
    'Aggregate and Mining Equipment',
    'Lifting Equipment',
    'Industrial Equipment',
    'RVs',
    'Others',
  ];

  return (
    <div className="">
      {displayedFilters.length > 0 && (
        <div className="mb-4 p-3 py-4 md:w-[274px] bg-white shadow rounded-[11px]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Applied Filters</span>
            <button onClick={clearAllFilters} className="text-red-600 cursor-pointer text-sm">
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {displayedFilters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center bg-[#333333] text-white px-2 py-1 rounded-[5px] text-[13px]"
              >
                {filter}
                <button
                  className="ml-2 cursor-pointer"
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
          <div>
            {["For Sale", "For Lease", "For Auction"].map(type => (
              <Checkbox
                key={type}
                label={type}
                checked={Array.isArray(filters.listingType) && filters.listingType.includes(type)}
                onChange={() => {
                  let newTypes = Array.isArray(filters.listingType) ? [...filters.listingType] : [];
                  if (newTypes.includes(type)) {
                    newTypes = newTypes.filter(t => t !== type);
                  } else {
                    newTypes.push(type);
                  }
                  handleCheckboxChange("listingType", newTypes);
                }}
              />
            ))}
          </div>
        </FilterSection>
        {/* Category */}
        <FilterSection title="Category" isOpen={openSections.category} toggle={() => toggleSection("category")}>
          <SelectBox
            options={truckCategory}
            value={filters.truckCategory}
            onChange={(value) => handleCheckboxChange("truckCategory", value)}
          />
        </FilterSection>

        <FilterSection title="SubCategory" isOpen={openSections.subCategory} toggle={() => toggleSection("subCategory")}>
          <SelectBox
            options={truckSubCategories[filters.truckCategory] || []}
            value={filters.truckSubCategory}
            onChange={(value) => handleCheckboxChange("truckSubCategory", value)}
          />
        </FilterSection>

        {/* Manufacturer */}
        <FilterSection title="Make" isOpen={openSections.vehicleManufacturer} toggle={() => toggleSection("vehicleManufacturer")}>
          <SearchInput
            placeholder="Search Make"
            value={filters.vehicleManufacturer}
            onChange={(value) => handleTextInputChange("vehicleManufacturer", value)}
          />
        </FilterSection>

        {/* Year Range */}
        <FilterSection title="Year" isOpen={openSections.year} toggle={() => toggleSection("year")}>
          <RangeInput
            minValue={filters.minYear}
            maxValue={filters.maxYear}
            onSearch={(min, max) => handleRangeChange("Year", min, max)}
          />
        </FilterSection>

        {/* Mileage */}
        <FilterSection title="Mileage" isOpen={openSections.mileage} toggle={() => toggleSection("mileage")}>
          <RangeInput
            minValue={filters.minMileage}
            maxValue={filters.maxMileage}
            onSearch={(min, max) => handleRangeChange("Mileage", min, max)}
          />
        </FilterSection>

        {/* Engine Manufacturer */}
        <FilterSection title="Engine Manufacturer" isOpen={openSections.engine} toggle={() => toggleSection("engine")}>
          <SearchInput
            placeholder="Search Engine Manufacturer"
            value={filters.engineManufacturer}
            onChange={(value) => handleTextInputChange("engineManufacturer", value)}
          />
        </FilterSection>

        <FilterSection title="Model" isOpen={openSections.model} toggle={() => toggleSection("model")}>
          <SearchInput
            placeholder="Search Model"
            value={filters.engineModel}
            onChange={(value) => handleTextInputChange("engineModel", value)}
          />
        </FilterSection>

        {/* Horsepower */}
        <FilterSection title="Horsepower" isOpen={openSections.horsepower} toggle={() => toggleSection("horsepower")}>
          <RangeInput
            minValue={filters.minHorsepower}
            maxValue={filters.maxHorsepower}
            onSearch={(min, max) => handleRangeChange("Horsepower", min, max)}
          />
        </FilterSection>

        <FilterSection title="Wheelbase" isOpen={openSections.wheelbase} toggle={() => toggleSection("wheelbase")}>
          <RangeInput
            minValue={filters.minWheelbase}
            maxValue={filters.maxWheelbase}
            onSearch={(min, max) => handleRangeChange("Wheelbase", min, max)}
          />
        </FilterSection>

        <FilterSection title="Suspension" isOpen={openSections.suspension} toggle={() => toggleSection("suspension")}>
          <SearchInput
            placeholder="Search Suspension"
            value={filters.suspension}
            onChange={(value) => handleTextInputChange("suspension", value)}
          />
        </FilterSection>

        <FilterSection title="Axle" isOpen={openSections.typeofRearAxles} toggle={() => toggleSection("typeofRearAxles")}>
          <SelectBox
            options={["Single Axle", "Regular Tandem", "Tri Axle", 'Quad Axle', 'Other']}
            value={filters.typeofRearAxles}
            onChange={(value) => handleCheckboxChange("typeofRearAxles", value)}
          />
        </FilterSection>

        <FilterSection title="Front Axle Weight" isOpen={openSections.FrontAxleWeight} toggle={() => toggleSection("FrontAxleWeight")}>
          <RangeInput
            minValue={filters.minFrontAxleWeight}
            maxValue={filters.maxFrontAxleWeight}
            onSearch={(min, max) => handleRangeChange("Front Axle Weight", min, max)}
          />
        </FilterSection>

        <FilterSection title="Rear Axle Weight" isOpen={openSections.BackAxleWeight} toggle={() => toggleSection("BackAxleWeight")}>
          <RangeInput
            minValue={filters.minBackAxleWeight}
            maxValue={filters.maxBackAxleWeight}
            onSearch={(min, max) => handleRangeChange("Back Axle Weight", min, max)}
          />
        </FilterSection>

        {/* Transmission */}
        <FilterSection title="Transmission Type" isOpen={openSections.transmissionType} toggle={() => toggleSection("transmissionType")}>
          <SelectBox
            options={["Automatic", "Manual", "Semi Auto"]}
            value={filters.transmissionType}
            onChange={(value) => handleCheckboxChange("transmissionType", value)}
          />
        </FilterSection>

        <FilterSection title="Number of Speeds" isOpen={openSections.noofSpeeds} toggle={() => toggleSection("noofSpeeds")}>
          <SearchInput
            placeholder="Search Speed"
            value={filters.noofSpeeds}
            onChange={(value) => handleTextInputChange("noofSpeeds", value)}
          />
        </FilterSection>

        <FilterSection title="Condition" isOpen={openSections.condition} toggle={() => toggleSection("condition")}>
          <div>
            {["New", "Used", "Salvaged"].map(cond => (
              <Checkbox
                key={cond}
                label={cond}
                checked={Array.isArray(filters.condition) && filters.condition.includes(cond)}
                onChange={() => {
                  let newConditions = Array.isArray(filters.condition) ? [...filters.condition] : [];
                  if (newConditions.includes(cond)) {
                    newConditions = newConditions.filter(c => c !== cond);
                  } else {
                    newConditions.push(cond);
                  }
                  handleCheckboxChange("condition", newConditions);
                }}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Country" isOpen={openSections.Country} toggle={() => toggleSection("Country")}>
          <CountryDropdown
            value={filters.country}
            onChange={(val) => handleTextInputChange("country", val)}
            className='w-full h-[45px] p-2 text-sm border-none outline-none shadow mb-6 rounded-[4px] mt-2'
          />
        </FilterSection>
      </div>
    </div>
  );
};

const SelectBox = ({ options, value, onChange }) => (
  <select
    className="w-full h-[45px] p-2 text-sm border-none outline-none shadow mb-6 rounded-[4px] mt-2"
    onChange={(e) => {
      if (e.target.value) {
        onChange(e.target.value);
      }
    }}
    value={value || ""}
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
      <button className="w-full flex justify-between items-center font-semibold cursor-pointer" onClick={toggle}>
        {title}
        <span>{isOpen ? <FaChevronUp /> : <FaAngleDown />}</span>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex mb-2 items-center cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-[14px] w-[14px] accent-[#DF0805] mr-2 border-gray-300 rounded"
    />
    <span className="text-sm">{label}</span>
  </label>
);

const SearchInput = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value || ""}
    onChange={(e) => onChange(e.target.value)}
    className="w-full h-[45px] p-2 text-sm border-none outline-none shadow mb-6 rounded-[4px] mt-2"
  />
);

const RangeInput = ({ minValue, maxValue, onSearch }) => {
  const [min, setMin] = useState(minValue || "");
  const [max, setMax] = useState(maxValue || "");

  useEffect(() => {
    setMin(minValue || "");
    setMax(maxValue || "");
  }, [minValue, maxValue]);

  return (
    <div className="flex gap-3 text-sm mt-2">
      <input
        type="number"
        placeholder="Min"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="w-[63px] h-[45px] p-2 shadow border-none outline-none rounded-md"
      />
      <input
        type="number"
        placeholder="Max"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        className="w-[63px] h-[45px] p-2 shadow border-none outline-none rounded-md"
      />
      <button
        className="bg-black h-[45px] w-[75px] text-white p-2 rounded-md"
        onClick={() => onSearch(min, max)}
      >
        Search
      </button>
    </div>
  );
};

export default FilterComponent;