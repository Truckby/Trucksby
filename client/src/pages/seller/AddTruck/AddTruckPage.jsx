import React, { useEffect, useState } from 'react';
import './style.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import truckService from '../../../services/truckService';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { IoImage } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router';
import { uploadImg } from '../../../services/image';
import { FaTimes } from 'react-icons/fa';

const AddTruckPage = () => {
  const location = useLocation();
  const oldTruckData = location.state;
  const [previewImages, setPreviewImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  // Add this useEffect to handle existing images
  useEffect(() => {
    if (oldTruckData?.images && Array.isArray(oldTruckData.images)) {
      setPreviewImages(oldTruckData.images);
    }
  }, [oldTruckData]);

  const formik = useFormik({
    initialValues: {
      vehicleName: oldTruckData?.vehicleName || "",
      vehiclePrice: oldTruckData?.vehiclePrice || "",
      truckCategory: oldTruckData?.truckCategory || "",
      truckSubCategory: oldTruckData?.truckSubCategory || "",
      listingType: oldTruckData?.listingType || "",
      name: oldTruckData?.name || "",
      phone: oldTruckData?.phone || "",
      email: oldTruckData?.email || "",
      companyName: oldTruckData?.companyName || "",
      address: oldTruckData?.address || "",
      modelYear: oldTruckData?.modelYear || "",
      mileage: oldTruckData?.mileage || null,
      vehicleManufacturer: oldTruckData?.vehicleManufacturer || "",
      hours: oldTruckData?.hours || "",
      vin: oldTruckData?.vin || "",
      condition: oldTruckData?.condition || "",
      wheelbase: oldTruckData?.wheelbase || null,
      steering: oldTruckData?.steering || "",
      color: oldTruckData?.color || "",
      suspension: oldTruckData?.suspension || "",
      engineManufacturer: oldTruckData?.engineManufacturer || "",
      engineModel: oldTruckData?.engineModel || "",
      grossVehicleWeight: oldTruckData?.grossVehicleWeight || null,
      hoursPower: oldTruckData?.hoursPower || null,
      description: oldTruckData?.description || "",
      transmissionType: oldTruckData?.transmissionType || "",
      noofSpeeds: oldTruckData?.noofSpeeds || "",
      transmissionManufacturer: oldTruckData?.transmissionManufacturer || "",
      typeofRearAxles: oldTruckData?.typeofRearAxles || '',
      frontAxleWeight: oldTruckData?.frontAxleWeight || null,
      backAxleWeight: oldTruckData?.backAxleWeight || "",
      country: oldTruckData?.country || "",
      state: oldTruckData?.state || "",
      images: oldTruckData?.images || [],
    },
    validationSchema: Yup.object({
      vehicleName: Yup.string().required("Vehicle name is required"),
      name: Yup.string().required("Name is required"),
      companyName: Yup.string().required("Company name is required"),
      phone: Yup.string().required("Phone number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      country: Yup.string().required("Country is required"),
      listingType: Yup.string().required("Listing type is required"),
      truckCategory: Yup.string().required("Truck category is required"),
      truckSubCategory: Yup.string().required("Truck subcategory is required"),
      condition: Yup.string().required("Condition is required"),
      vehicleManufacturer: Yup.string().required("Vehicle manufacturer is required"),
      modelYear: Yup.string().required("Model year is required"),
      vehiclePrice: Yup.string().required("Vehicle price is required"),
      description: Yup.string().required("Description is required"),
      images: Yup.array().min(1, "At least one image is required"), // <-- Add this line

    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const numericFields = [
        "vehiclePrice",
        "modelYear",
        "mileage",
        "wheelbase",
        "hoursPower",
        "frontAxleWeight",
        "backAxleWeight",
        "grossVehicleWeight",
        "phone"
      ];

      let imageUrls = [];

      // Upload new images if any
      if (selectedFiles.length > 0) {
        const form = new FormData();
        selectedFiles.forEach(file => {
          form.append("images", file);
        });

        const res = await uploadImg(form);
        if (res?.success) {
          if (Array.isArray(res.urls)) {
            imageUrls = res.urls;
          } else if (res.urls) {
            imageUrls = [res.urls];
          }
        } else {
          toast.error("Failed to upload images");
          setSubmitting(false);
          return;
        }
      } else if (values.images && values.images.length > 0) {
        // If editing and there are already image URLs
        imageUrls = values.images.filter(img => typeof img === "string");
      }

      const truckData = {
        ...values,
        images: imageUrls // Only URLs, no File objects!
      };

      // Convert numeric fields to numbers if present
      numericFields.forEach((field) => {
        if (truckData[field] !== "") {
          truckData[field] = Number(truckData[field]);
        }
      });

      try {
        if (oldTruckData?._id) {
          await truckService.updateTruck(oldTruckData._id, truckData);
          toast.success('Truck updated successfully!');
        } else {
          await truckService.createTruck(truckData);
          toast.success('Truck listed successfully!');
          resetForm();
          setPreviewImages([]);
          setSelectedFiles([]);
        }
        navigate('/seller/listing');
      } catch (error) {
        toast.error(error?.response?.data?.error || 'Listing failed');
        console.error('Listing error:', error);
      }
      setSubmitting(false);
    }


  });


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);

    // Update Formik's images field so validation passes
    formik.setFieldValue('images', files);
  };



  const handleRemoveImage = (index) => {
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    const updatedImageUrls = formik.values.images.filter((_, i) => i !== index);

    setPreviewImages(updatedPreviews);
    formik.setFieldValue('images', updatedImageUrls);

  };

  const truckCategory = [
    'Trucks',
    'Trailers',
    'Construction Equipment',
    'Logging Equipment',
    'Farm Equipment',
    'Aggregate and Mining Equipment',
    'Lifting Equipment',
    'Industrial Equipment',
    'RVs'
  ];


  const truckSubCategories = {
    "Trucks": [
      "Ambulances", "Attenuator Trucks", "Beverage Trucks", "Boom & Bucket Trucks", "Bridge Inspection Trucks",
      "Buses", "Cab & Chassis Trucks", "Cable Reel Loader Trucks", "Cabover Sleepers", "Cabover Trucks",
      "Car Carrier Trucks", "Cargo Vans", "Chemical & Acid Trucks", "Chipper Trucks", "Concrete Pump Trucks",
      "Conveyor Trucks", "Crane Trucks", "Curtain Side Trucks", "Day Cab Semi Trucks", "Delivery / Moving / Straight / Box Trucks",
      "Digger Derrick Trucks", "Drilling Rigs", "Dump Trucks", "Emergency Vehicles", "Equipment Carrier Trucks",
      "Expeditor / Hot Shot Trucks", "Farm & Grain Trucks", "Fire Trucks", "Flatbed Dump Trucks", "Flatbed Trucks",
      "Food Trucks", "Forestry Bucket Trucks", "Fuel & Lube Trucks", "Garbage Trucks", "Gasoline / Fuel Trucks",
      "Glider Kits", "Grapple Trucks", "Hauler Trucks", "Heavy Expanded Mobility Tactical Trucks (HEMTT)", "Hooklift Trucks",
      "Hot Oil / Asphalt Distributor Trucks", "Landscape Trucks", "Lift Trucks", "Logging Trucks", "Mechanic / Utility / Service Trucks",
      "Medium Tactical Vehicles (MTV)", "Military Trucks", "Mixer / Ready Mix / Concrete Trucks", "Oil Field Trucks", "Other Trucks",
      "Passenger Vans", "Pickup Trucks", "Plow / Spreader Trucks", "Pole Trucks", "Propane Trucks",
      "Railroad Trucks", "Recycling Trucks", "Refrigerated Trucks", "Roll Off Dumpsters", "Roll Off Trucks",
      "Rollback Tow Trucks", "Salvage Trucks", "Service Vans", "Sewer / Septic Trucks", "Sleeper Semi Trucks",
      "Stake Bed Trucks", "Step Vans", "Sweeper Trucks", "Tanker Trucks", "Transfer Trucks",
      "Truck Bodies / Boxes / Beds", "Vacuum Trucks", "Water Trucks", "Winch Trucks", "Wrecker Tow Trucks",
      "Yard Spotter Trucks"
    ],
    "Trailers": [
      "Asphalt Tack Wagons / Distributor Trailers", "ATV Trailers", "Beavertail Trailers", "Belt Trailers", "Beverage Trailers",
      "Blade Trailers", "Cable Reel Trailers", "Car Hauler Trailers", "Chassis Trailer", "Chip Trailers",
      "Conestoga / Curtain Side Trailers", "Container Trailers", "Dolly Trailers", "Double Drop Trailers", "Drop Deck Trailers",
      "Drop Frame Trailers", "Dry Van Trailers", "Dump Trailers", "Dump Trailers (Semi Truck)", "Enclosed Cargo Trailers",
      "Equipment Transport Trailers", "Farm Trailers", "Feed Trailers", "Fiber Splicing Trailers", "Fire Trailers",
      "Flatbed Trailers", "Flip Axles", "Fuel Trailers (Bumper-Pull)", "Gooseneck Trailers", "Header Trailers",
      "Hopper / Grain Trailers", "Horse Trailers", "Jeeps & Boosters", "Landscape Trailers", "Live Floor Trailers",
      "Livestock Trailers", "Log Trailers", "Lowboy Trailers", "Military Trailers", "Office Trailers",
      "Oil Field Trailers", "Open Top Trailers", "Pintle Trailers", "Pole Trailers", "Pump Trailers",
      "Pup Trailers", "Refrigerated Trailers", "Refuse Trailers", "Roll Off Dumpsters", "Roll Off Trailers",
      "Shipping / Roll Off / Storage Containers", "Solar Trailers", "Specialty Trailers", "Storage Trailers", "Super B Trains",
      "Tag Trailers", "Tank Trailers", "Asphalt / Hot Oil Tank Trailers", "Chemical & Acid Tank Trailers", "Crude Oil Tank Trailers",
      "Dry Bulk & Pneumatic Tank Trailers", "Food Grade Tank Trailers", "Fuel Tanker Trailers", "Industrial Gas Tank Trailers", "Non Code Tank Trailers",
      "Storage Pig Trailers", "Vacuum Tank Trailers", "Waste / Sludge Tank Trailers", "Water Tank Trailers"
    ],
    "Construction Equipment": [
      "Air Compressors", "Articulated Trucks", "Asphalt / Cement / Hot Mix Silos", "Asphalt Chip Spreaders", "Asphalt Crack Sealers",
      "Asphalt Equipment", "Asphalt Heaters", "Asphalt Patchers", "Asphalt Pavers", "Asphalt Tack Wagons / Distributor Trailers",
      "Backhoes", "Cable Reel Trailers", "Cold Planers / Milling Machines", "Concrete / Cement / Mortar Mixers", "Concrete / Pavement Breakers",
      "Concrete Buggies", "Concrete Equipment", "Concrete Finishers", "Concrete Grinders", "Concrete Pavers / Spreaders / Slipform Pavers",
      "Concrete Pumps", "Concrete Saws", "Crawler Carriers", "Crawler Loaders", "Curb Machines",
      "Demolition Equipment", "Directional Drills (HDD)", "Dismantled / Parting Out Heavy Equipment", "Dozers", "Drill Rods",
      "Drilling Equipment", "Drilling Rigs", "Dumpers", "Dust Control Solutions", "Excavators",
      "Generator Sets", "HDD Guidance Systems", "Light Towers", "Long Reach Excavators", "Material Transfer Vehicles",
      "Mini Excavators", "Miscellaneous Equipment", "Motor Graders", "Mud Systems", "Off-Highway Trucks",
      "Padfoot Rollers", "Pavement Marking / Road Striping Equipment", "Pile Drivers", "Pipelayers", "Plate Compactors",
      "Pneumatic Tired Rollers", "Road Reclaimers & Soil Stabilizers", "Road Wideners", "Scrapers", "Skid Steers",
      "Skip Loaders", "Smooth Drum Rollers", "Sweepers", "Telehandlers", "Towable Heaters",
      "Traffic Control / Arrow / Message Boards", "Trench Boxes / Shields", "Trenchers / Boring Machines / Cable Plows", "Vacuum Excavators", "Walk / Tow Behind Compactors",
      "Water Equipment", "Water Towers", "Water Trucks", "Water Wagons", "Wheel Dozers",
      "Wheel Loaders", "Wheeled Excavators"
    ],
    "Logging Equipment": [
      "Air Curtain Burners", "Assorted Forestry Equipment", "Chip Trailers", "Chipper Trucks", "Delimbers",
      "Feller Bunchers", "Felling Heads", "Fire Trailers", "Firewood Processors", "Forestry Brush Cutters",
      "Forestry Bucket Trucks", "Forestry Dozers", "Forestry Harvesting Heads", "Forestry Mulchers", "Forwarders",
      "Grapple Trucks", "Harvesters", "Horizontal Grinders", "Knuckleboom Loaders", "Live Floor Trailers",
      "Log Forks", "Log Grapples", "Log Loaders", "Log Splitters", "Log Trailers",
      "Logging Trucks", "Motorized Carriages", "Mulcher Attachments", "Portable Debarkers", "Processor Machines",
      "Road Builders (Excavators)", "Skidders", "Slasher Saws", "Stump Grinders", "Tree Jacks",
      "Tree Shears", "Tree Spades", "Tree Trimming Machines", "Tub Grinders", "Winch Assist Systems",
      "Wood Chippers", "Yarders"
    ],
    "Farm Equipment": [
      "Applicators / Sprayers / Spreaders", "Assorted Ag Equipment", "Bale Grabbers", "Bale Spears", "Box Blades & Scrapers",
      "Chemical Applicators", "Combine Attachments", "Combine Headers", "Combines", "Cotton Pickers",
      "Drones", "Farm & Garden Fencing", "Farm & Grain Trucks", "Farm Trailers", "Feed Trailers",
      "Forage Harvesters", "Grain Handling / Storage Equipment", "Harvesting Equipment", "Hay & Forage Equipment", "Header Trailers",
      "Hitches", "Irrigation Equipment", "Land Levelers", "Livestock & Manure Equipment", "Nut And Tree Equipment",
      "Planting Equipment", "Precision Ag Equipment", "Skid Steers", "Skip Loaders", "Tillage Equipment",
      "Tractors", "Tree Trimming Machines", "Vineyard Equipment"
    ],
    "Aggregate and Mining Equipment": [
      "Asphalt / Cement / Hot Mix Silos", "Asphalt Plants", "Assorted Aggregate & Mining Equipment", "Bag Houses", "Ball Mills",
      "Bark & Mulch Blowers", "Blasthole Drills", "Cold Feeders", "Concrete Batch Plants", "Conveyors",
      "Crushing Plants", "Dust Collectors", "Dust Control Solutions", "Feeders", "Grizzly Screens",
      "Hoppers", "Hydrocyclones", "Loadout Bunkers", "Log Washers", "Metal Melting Furnaces",
      "Mineral Jigs", "Mud Systems", "Off-Highway Trucks", "Pugmill Systems", "Rip Rap Plants",
      "Sandscrews", "Screening Plants", "Separators", "Slurry Pumps", "Trommel Screens",
      "Truck Unloaders", "Underground Equipment", "Underground Mining Loaders", "Underground Mining Trucks", "Wash Plants"
    ],
    "Lifting Equipment": [
      "All Terrain Cranes", "Boom & Bucket Trucks", "Boom Lifts", "Bridge Cranes", "Carry Deck Cranes",
      "Container Handlers", "Crane Trucks", "Cranes", "Crawler Cranes / Draglines", "Forestry Bucket Trucks",
      "Forklifts", "Gantry Cranes", "Lattice Boom Truck Cranes", "Man Lifts", "Material Lifts",
      "Rough Terrain Cranes", "Scissor Lifts", "Telehandlers", "Telescopic Boom Truck Cranes", "Tower Cranes",
      "Towable Boom Lifts"
    ],
    "Industrial Equipment": [
      "Above Ground Storage Tanks", "Aircrafts", "Assorted Industrial Equipment", "Barges", "Commercial Trash Compactors",
      "Crawler Carriers", "Dust Control Solutions", "Electrical Distribution Equipment", "Floor Scrubbers", "Floor Strippers",
      "Floor Sweepers", "Fusion Machines", "Generator Sets", "Golf / Utility Carts", "Helicopters",
      "Hydraulic Power Units", "Industrial Blowers", "Industrial Heaters", "Industrial Ovens", "Industrial Paper Shredders",
      "Industrial Power Units", "Industrial Spray Painting Equipment", "Landfill Compactors", "Light Towers", "Locomotives",
      "Machine Presses", "Manufacturing Equipment", "Pavement Marking / Road Striping Equipment", "Plasma Cutting Machines", "Pumps",
      "Rail / Ballast Equipment", "Roll Off Dumpsters", "Shipping / Roll Off / Storage Containers", "Snow Removal Equipment", "Solar Trailers",
      "Sweepers", "Tanks", "Tire / Wheel Balancer Machines", "Tow Tractors / Tow Tugs", "Towable Heaters",
      "Traffic Control / Arrow / Message Boards", "Tree Trimming Machines", "Truck Scales", "Vacuum Excavators", "Vehicle Lift Systems",
      "Vertical Milling Machines", "Wastewater Treatment Equipment", "Water Equipment", "Water Towers", "Welding Machines",
      "Well Service Pumps"
    ],
    "RVs": [
      "Motorhomes", "Towables Rv's", "Travel Trailers", "Trailer Bodies", "Transfer Trailers",
      "Utility Trailers", "Wellsite Trailers", "Toy Haulers"
    ]
  }


  return (
    <div className='py-[65px]'>
      <div className='max-w-[1147px] mx-auto bg-white rounded-[20px] md:px-[79px] md:py-[65px] p-4 shadow'>
        <h2 className='text-2xl sm:text-[32px] font-bold leading-[61px] pb-[45px]'>List Your Equipment</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Vehicle Details */}
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="vehicleName">Vehicle Name *</label>
                <input
                  type="text"
                  name="vehicleName"
                  placeholder="Enter your vehicle name"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.vehicleName}
                />
                {formik.errors.vehicleName && formik.touched.vehicleName && (
                  <div className="text-red-500 text-sm">{formik.errors.vehicleName}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="vehiclePrice">Vehicle Price *</label>
                <input
                  type="number"
                  name='vehiclePrice'
                  placeholder="$"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.vehiclePrice}
                />
                {formik.errors.vehiclePrice && formik.touched.vehiclePrice && (
                  <div className="text-red-500 text-sm">{formik.errors.vehiclePrice}</div>
                )}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="truckCategory">Truck Category *</label>
                <select
                  name="truckCategory"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.truckCategory}
                >
                  <option value="" disabled>Select Truck Type</option>
                  {truckCategory.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                {formik.errors.truckCategory && formik.touched.truckCategory && (
                  <div className="text-red-500 text-sm">{formik.errors.truckCategory}</div>
                )}
              </div>

              <div>
                {formik.values.truckCategory ? (
                  <div className="mb-6">
                    <label htmlFor="truckSubCategory" className="block font-medium mb-2">Subcategory *</label>
                    <select
                      id="truckSubCategory"
                      name="truckSubCategory"
                      onChange={formik.handleChange}
                      value={formik.values.truckSubCategory}
                      className="input"
                    >
                      <option value="">Select a Subcategory</option>
                      {truckSubCategories[formik.values.truckCategory]?.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                    {formik.errors.truckSubCategory && formik.touched.truckSubCategory && (
                      <div className="text-red-500 text-sm">{formik.errors.truckSubCategory}</div>
                    )}
                  </div>
                ) :
                  (
                    <div className="mb-6 opacity-50">
                      <label htmlFor="truckSubCategory" className="block font-medium mb-2">Subcategory *</label>
                      <select
                        disabled
                        id="truckSubCategory"
                        name="truckSubCategory"
                        onChange={formik.handleChange}
                        value={formik.values.truckSubCategory}
                        className="input"
                      >
                        <option value="">Select a Subcategory</option>
                        {truckSubCategories[formik.values.truckCategory]?.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                      {formik.errors.truckSubCategory && formik.touched.truckSubCategory && (
                        <div className="text-red-500 text-sm">First select the Category</div>
                      )}
                    </div>
                  )}
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:space-x-[31px]'>

              <div className='mb-9'>
                <label className="label" htmlFor="listingType">Listing Type *</label>
                <select
                  name="listingType"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.listingType}
                >
                  <option value="" disabled>Select Listing Type</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Lease">For Lease</option>
                  <option value="For Auction">For Auction</option>
                </select>
                {formik.errors.listingType && formik.touched.listingType && (
                  <div className="text-red-500 text-sm">{formik.errors.listingType}</div>
                )}
              </div>


              <div className='mb-9'>
                <label className="label">Country *</label>
                <CountryDropdown
                  value={formik.values.country}
                  onChange={(val) => {
                    formik.setFieldValue('country', val);
                    formik.setFieldValue('state', ''); // Reset state when country changes
                  }}
                  className='input'
                />
                {formik.errors.country && formik.touched.country && (
                  <div className="text-red-500 text-sm">{formik.errors.country}</div>
                )}
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 md:space-x-[31px]'>

              {formik.values.country === 'United States' ? (
                <div className='mb-9'>
                  <label className="label">State/Region</label>
                  <RegionDropdown
                    country={formik.values.country}
                    value={formik.values.state}
                    onChange={(val) => formik.setFieldValue('state', val)}
                    className='input'
                  />
                </div>
              )
                : <div className='mb-9 opacity-50'>
                  <label className="label">State/Region</label>
                  <RegionDropdown
                    disabled
                    country={formik.values.country}
                    value={formik.values.state}
                    onChange={(val) => formik.setFieldValue('state', val)}
                    className='input'
                  />
                </div>
              }

              <div className="col-span-2">
                <label
                  htmlFor="upload"
                  className="border-dashed border-2 rounded p-6 cursor-pointer flex flex-col items-center justify-center"
                >
                  <input
                    type="file"
                    id="upload"
                    hidden
                    multiple
                    onChange={handleFileChange}
                  />
                  <div className="flex flex-col items-center text-center">
                    <IoImage color='text-gray-500 ' fontSize={20} />
                    <p className="text-gray-500 mt-2 font-medium">
                      Drag or Click to upload media
                    </p>
                    <p className="text-sm text-gray-400">(Upload images)</p>
                  </div>
                  {/* Show image previews */}
                  {previewImages.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-4">
                      {previewImages.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
                          <img
                            src={image}
                            alt={`preview-${index}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                </label>
                {formik.errors.images && formik.touched.images && (
                  <div className="text-red-500 text-sm mt-2">{formik.errors.images}</div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <h3 className="mt-9 bg-[#DF0805] text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Personal Info</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="name">Name *</label>
              <input
                type="text"
                name='name'
                placeholder="Enter your Name"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="phone">Phone *</label>
              <input
                type="number"
                name='phone'
                placeholder="Enter Phone Number"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
              )}
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="email">Email *</label>
              <input
                type="email"
                name='email'
                placeholder="Enter your Email"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="companyName">Company Name *</label>
              <input
                type="text"
                name='companyName'
                placeholder="Enter your Company Name"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.companyName}
              />
              {formik.errors.companyName && formik.touched.companyName && (
                <div className="text-red-500 text-sm">{formik.errors.companyName}</div>
              )}
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="address">Address</label>
              <input
                type="text"
                name='address'
                placeholder="Enter your Address"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.address}
              />
            </div>
          </div>

          {/* General Info */}
          <h3 className="bg-[#DF0805] text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">General</h3>
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="modelYear">Year *</label>
                <input
                  type="number"
                  name='modelYear'
                  placeholder="Enter Year"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.modelYear}
                />
                {formik.errors.modelYear && formik.touched.modelYear && (
                  <div className="text-red-500 text-sm">{formik.errors.modelYear}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="mileage">Mileage</label>
                <input
                  type="text"
                  name='mileage'
                  placeholder="Enter Mileage"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.mileage}
                />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="vehicleManufacturer">Vehicle Manufacturer *</label>
                <input
                  type="text"
                  name='vehicleManufacturer'
                  placeholder="Enter Vehicle Manufacturer"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.vehicleManufacturer}
                />
                {formik.errors.vehicleManufacturer && formik.touched.vehicleManufacturer && (
                  <div className="text-red-500 text-sm">{formik.errors.vehicleManufacturer}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="hours">Hours</label>
                <input
                  type="text"
                  name='hours'
                  placeholder="Enter Hours"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.hours}
                />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="vin">VIN</label>
                <input
                  type="text"
                  name='vin'
                  placeholder="Enter your Vehicle Name"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.vin}
                />
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="condition">Condition *</label>
                <select
                  name="condition"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.condition}
                >
                  <option value="" disabled>Select Condition</option>
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Salvaged">Salvaged</option>
                </select>
                {formik.errors.condition && formik.touched.condition && (
                  <div className="text-red-500 text-sm">{formik.errors.condition}</div>
                )}
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <h3 className="bg-[#DF0805] text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Vehicle Info</h3>
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="wheelbase">Wheelbase</label>
                <input
                  type="number"
                  name='wheelbase'
                  placeholder="Enter Wheelbase"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.wheelbase}
                />
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="steering">Steering</label>
                <input
                  type="text"
                  name='steering'
                  placeholder="Enter your Steering"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.steering}
                />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="color">Color</label>
                <input
                  type="text"
                  name='color'
                  placeholder="Enter your Color"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.color}
                />
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="suspension">Suspension</label>
                <input
                  type="text"
                  name='suspension'
                  placeholder="Enter your Suspension"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.suspension}
                />
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="engineManufacturer">Engine Manufacturer</label>
                <input
                  type="text"
                  name='engineManufacturer'
                  placeholder="Enter your Engine Manufacturer"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.engineManufacturer}
                />
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="engineModel">Engine Model</label>
                <input
                  type="text"
                  name='engineModel'
                  placeholder="Enter your Engine Model"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.engineModel}
                />
              </div>


              <div className='mb-9'>
                <label className="label" htmlFor="hoursPower">Horse Power</label>
                <input
                  type="number"
                  name='hoursPower'
                  placeholder="Enter your Horse Power"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.hoursPower}
                />
              </div>
            </div>

            <div className="mb-9">
              <label className="label" htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter your Description"
                className="w-full p-2 shadow rounded-md resize-none"
                rows={7}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.errors.description && formik.touched.description && (
                <div className="text-red-500 text-sm">{formik.errors.description}</div>
              )}
            </div>


          </div>

          {/* Powertrain */}
          <h3 className="bg-[#DF0805] text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Powertrain</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="transmissionType">Transmission Type</label>
              <select
                name="transmissionType"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.transmissionType}
              >
                <option value="" disabled>Select axle type</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi Auto">Semi Auto</option>
              </select>
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="noofSpeeds">No of Speeds</label>
              <input
                type="text"
                name='noofSpeeds'
                placeholder="Enter Speed"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.noofSpeeds}
              />
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="transmissionManufacturer">Transmission Manufacturer</label>
              <input
                type="text"
                name='transmissionManufacturer'
                placeholder="Enter Transmission Manufacturer"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.transmissionManufacturer}
              />

            </div>
          </div>

          {/* Chassis */}
          <h3 className="bg-[#DF0805] text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Chassis</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="typeofRearAxles">Type of Axle</label>
              <select
                name="typeofRearAxles"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.typeofRearAxles}
              >
                <option value="" disabled>Select axle type</option>
                <option value="Single Axle">Single Axle</option>
                <option value="Regular Tandem">Regular Tandem</option>
                <option value="Tri Axle">Tri Axle</option>
                <option value="Quad Axle">Quad Axle</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="frontAxleWeight">Front Axle Weight</label>
              <input
                type="number"
                name='frontAxleWeight'
                placeholder="e.g lbs"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.frontAxleWeight}
              />
              {formik.errors.frontAxleWeight && formik.touched.frontAxleWeight && (
                <div className="text-red-500 text-sm">{formik.errors.frontAxleWeight}</div>
              )}
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="backAxleWeight">Back Axle Weight</label>
              <input
                type="number"
                name='backAxleWeight'
                placeholder="e.g lbs"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.backAxleWeight}
              />
              {formik.errors.backAxleWeight && formik.touched.backAxleWeight && (
                <div className="text-red-500 text-sm">{formik.errors.backAxleWeight}</div>
              )}
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="grossVehicleWeight">Gross Vehicle Weight</label>
              <input
                type="number"
                name='grossVehicleWeight'
                placeholder="e.g Heavy Weight"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.grossVehicleWeight}
              />
              {formik.errors.grossVehicleWeight && formik.touched.grossVehicleWeight && (
                <div className="text-red-500 text-sm">{formik.errors.grossVehicleWeight}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#DF0805] text-white rounded-[10px] cursor-pointer mt-4 h-[48px] md:h-[54px] w-[180px] md:w-[214px] flex justify-center items-center ml-auto"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Listing...' : oldTruckData ? 'Update Truck' : 'List Truck'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTruckPage;