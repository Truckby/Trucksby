import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CountryDropdown } from "react-country-region-selector";

const FilterComponent = ({ onFilterChange,filters,setFilters }) => {
  const [openSections, setOpenSections] = useState({
    listingType: false, // Open the first section by default
    category: false,
    manufacturer: false,
    year: false,
    mileage: false,
    engine: false,
    horsepower: false,
    wheelbase: false,
    suspension: false,
    axel: false,
    FrontAxleWeight: false,
    BackAxleWeight: false,
    transmission: false,
    NumberofSpeeds: false,
    condition: false,
    Country: false
  });

  // Track which checkbox filters are selected for UI
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle checkbox selection for UI display
  const handleCheckboxChange = (category, value) => {
    // Create a label for the filter display
    const filterLabel = `${category}: ${value}`;
    
    // Update the selected filters for UI display
    setSelectedFilters(prev => {
      // Check if we already have a filter from this category
      const existingCategoryFilterIndex = prev.findIndex(f => f.startsWith(`${category}:`));
      
      if (existingCategoryFilterIndex !== -1) {
        // Replace the existing category filter
        const newFilters = [...prev];
        newFilters[existingCategoryFilterIndex] = filterLabel;
        return newFilters;
      } else {
        // Add new filter
        return [...prev, filterLabel];
      }
    });
    
    // Update the actual filter value
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  // Handle range inputs (min/max values)
  const handleRangeChange = (category, min, max) => {
    // Format the display label
    const minValue = min || "Any";
    const maxValue = max || "Any";
    const filterLabel = `${category}: ${minValue}-${maxValue}`;
    
    // Update selected filters for UI
    setSelectedFilters(prev => {
      const existingFilterIndex = prev.findIndex(f => f.startsWith(`${category}:`));
      if (existingFilterIndex !== -1) {
        const newFilters = [...prev];
        newFilters[existingFilterIndex] = filterLabel;
        return newFilters;
      } else {
        return [...prev, filterLabel];
      }
    });
    
    // Update the actual filter values
    const minKey = `min${category.charAt(0).toUpperCase() + category.slice(1)}`;
    const maxKey = `max${category.charAt(0).toUpperCase() + category.slice(1)}`;
    
    setFilters(prev => ({
      ...prev,
      [minKey]: min,
      [maxKey]: max
    }));
  };

  // Handle text input filters
  const handleTextInputChange = (category, value) => {
    if (!value) {
      // Remove from selected filters if empty
      setSelectedFilters(prev => prev.filter(f => !f.startsWith(`${category}:`)));
      
      // Update the filter state
      setFilters(prev => ({
        ...prev,
        [category]: ''
      }));
      return;
    }
    
    // Create label for display
    const filterLabel = `${category}: ${value}`;
    
    // Update selected filters for UI
    setSelectedFilters(prev => {
      const existingFilterIndex = prev.findIndex(f => f.startsWith(`${category}:`));
      if (existingFilterIndex !== -1) {
        const newFilters = [...prev];
        newFilters[existingFilterIndex] = filterLabel;
        return newFilters;
      } else {
        return [...prev, filterLabel];
      }
    });
    
    // Update the filter state
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const removeFilter = (filterLabel) => {
    // Extract category from the filter label (format: "category: value")
    const category = filterLabel.split(':')[0].trim();
    
    // Remove from selected filters
    setSelectedFilters(prev => prev.filter(f => f !== filterLabel));
    
    // Reset the corresponding filter value
    if (category === 'Year' || category === 'Mileage' || category === 'Horsepower' || 
        category === 'Wheelbase' || category === 'Front Axle Weight' || category === 'Back Axle Weight') {
      // Handle range inputs
      const minKey = `min${category.replace(/\s+/g, '')}`;
      const maxKey = `max${category.replace(/\s+/g, '')}`;
      
      setFilters(prev => ({
        ...prev,
        [minKey]: '',
        [maxKey]: ''
      }));
    } else {
      // Handle single value inputs
      const filterKey = category.toLowerCase().replace(/\s+/g, '');
      
      setFilters(prev => ({
        ...prev,
        [filterKey]: ''
      }));
    }
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setFilters({
      listingType: '',
      truckCategory: '',
      manufacturer: '',
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
      transmission: '',
      speeds: '',
      condition: '',
      country: ''
    });
  };

  // Notify parent component when filters change
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  return (
    <div className="">
      {selectedFilters.length > 0 && (
        <div className="mb-4 p-3 py-4 md:w-[274px] bg-white shadow rounded-[11px]">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Applied Filters</span>
            <button onClick={clearAllFilters} className="text-red-600 cursor-pointer text-sm">
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
          <div>
            <Checkbox 
              label="For Sale" 
              checked={filters.listingType === "For Sale"}
              onChange={() => handleCheckboxChange("listingType", "For Sale")} 
            />
            <Checkbox 
              label="For Lease" 
              checked={filters.listingType === "For Lease"}
              onChange={() => handleCheckboxChange("listingType", "For Lease")} 
            />
            <Checkbox 
              label="For Auction" 
              checked={filters.listingType === "For Auction"}
              onChange={() => handleCheckboxChange("listingType", "For Auction")} 
            />
          </div>
        </FilterSection>

        {/* Category */}
        <FilterSection title="Category" isOpen={openSections.category} toggle={() => toggleSection("category")}>
          <SelectBox
            options={["Flatbed", "Refrigerated", "Dry Van", 'Tanker', 'Lowboy', 'Box Truck']}
            value={filters.truckCategory}
            onChange={(value) => handleCheckboxChange("truckCategory", value)}
          />
        </FilterSection>

        {/* Manufacturer */}
        <FilterSection title="Manufacturer" isOpen={openSections.manufacturer} toggle={() => toggleSection("manufacturer")}>
          <SelectBox
            options={["Hyundai", "KIA", "Isuzu", 'Mitsubishi', 'Hino']}
            value={filters.manufacturer}
            onChange={(value) => handleCheckboxChange("manufacturer", value)}
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
          <div className="mt-2">
            <Checkbox 
              label="Air Ride" 
              checked={filters.suspension === "Air Ride"}
              onChange={() => handleCheckboxChange("suspension", "Air Ride")} 
            />
            <Checkbox 
              label="Flex Air" 
              checked={filters.suspension === "Flex Air"}
              onChange={() => handleCheckboxChange("suspension", "Flex Air")} 
            />
          </div>
        </FilterSection>

        <FilterSection title="Number of Rear Axles" isOpen={openSections.axel} toggle={() => toggleSection("axel")}>
          <SelectBox
            options={["1", "2", "3", "4", "5+"]}
            value={filters.rearAxles}
            onChange={(value) => handleCheckboxChange("rearAxles", value)}
          />
        </FilterSection>

        <FilterSection title="Front Axle Weight" isOpen={openSections.FrontAxleWeight} toggle={() => toggleSection("FrontAxleWeight")}>
          <RangeInput 
            minValue={filters.minFrontAxleWeight}
            maxValue={filters.maxFrontAxleWeight}
            onSearch={(min, max) => handleRangeChange("Front Axle Weight", min, max)}
          />
        </FilterSection>

        <FilterSection title="Back Axle Weight" isOpen={openSections.BackAxleWeight} toggle={() => toggleSection("BackAxleWeight")}>
          <RangeInput 
            minValue={filters.minBackAxleWeight}
            maxValue={filters.maxBackAxleWeight}
            onSearch={(min, max) => handleRangeChange("Back Axle Weight", min, max)}
          />
        </FilterSection>

        {/* Transmission */}
        <FilterSection title="Transmission" isOpen={openSections.transmission} toggle={() => toggleSection("transmission")}>
          <div>
            <Checkbox 
              label="Automatic" 
              checked={filters.transmission === "Automatic"}
              onChange={() => handleCheckboxChange("transmission", "Automatic")} 
            />
            <Checkbox 
              label="Manual" 
              checked={filters.transmission === "Manual"}
              onChange={() => handleCheckboxChange("transmission", "Manual")} 
            />
            <Checkbox 
              label="Semi Auto" 
              checked={filters.transmission === "Semi Auto"}
              onChange={() => handleCheckboxChange("transmission", "Semi Auto")} 
            />
          </div>
        </FilterSection>

        <FilterSection title="Number of Speeds" isOpen={openSections.NumberofSpeeds} toggle={() => toggleSection("NumberofSpeeds")}>
          <SearchInput 
            placeholder="Search Speed" 
            value={filters.speeds}
            onChange={(value) => handleTextInputChange("speeds", value)}
          />
        </FilterSection>

        <FilterSection title="Condition" isOpen={openSections.condition} toggle={() => toggleSection("condition")}>
          <div>
            <Checkbox 
              label="New" 
              checked={filters.condition === "New"}
              onChange={() => handleCheckboxChange("condition", "New")} 
            />
            <Checkbox 
              label="Used" 
              checked={filters.condition === "Used"}
              onChange={() => handleCheckboxChange("condition", "Used")} 
            />
            <Checkbox 
              label="Salvaged" 
              checked={filters.condition === "Salvaged"}
              onChange={() => handleCheckboxChange("condition", "Salvaged")} 
            />
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
      <button className="w-full flex justify-between items-center font-semibold" onClick={toggle}>
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