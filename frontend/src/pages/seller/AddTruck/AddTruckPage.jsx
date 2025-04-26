import React, { useState } from 'react';
import './style.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import truckService from '../../../services/truckService';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { IoImage } from 'react-icons/io5';
import { useLocation } from 'react-router';

const AddTruckPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const truckData = location.state;

  console.log(truckData)

  const formik = useFormik({
    initialValues: {
      vehicleName: "",
      vehiclePrice: "",
      truckCategory: "",
      listingType: "",
      name: "",
      phone: "",
      email: "",
      companyName: '',
      address: '',
      modelYear: "",
      mileage: "",
      VehicleManufacturer: "",
      hours: "",
      vin: "",
      condition: "",
      wheelbase: "",
      steering: "",
      color: "",
      suspension: "",
      engineManufacturer: "",
      engineModel: '',
      grossVehicleWeight: "",
      hoursPower: '',
      description: '',
      transmissionType: "",
      noofSpeeds: "",
      transmissionManufacturer: '',
      typeofRearAxles: "",
      frontAxleWeight: "",
      backAxleWeight: "",
      country: '',
      state: '',

    },
    // validationSchema: Yup.object({
    //   vehicleName: Yup.string().required("Vehicle name is required"),
    //   vehiclePrice: Yup.number().typeError("Must be a number").required("Vehicle price is required"),
    //   truckCategory: Yup.string().required("Truck category is required"),
    //   country: Yup.string().required("country is required"),
    //   name: Yup.string().required("Name is required"),
    //   phone: Yup.string().required("phone is required"),
    //   email: Yup.string().email("Invalid email").required("email is required"),
    //   modelYear: Yup.string().required("Model year is required"),
    //   mileage: Yup.string().required("mileage is required"),
    //   VehicleManufacturer: Yup.string().required("Manufacturer is required"),
    //   hours: Yup.string().required("hours are required"),
    //   vin: Yup.string().required("vin is required"),
    //   condition: Yup.string().required("condition is required"),
    //   wheelbase: Yup.string().required("wheelbase is required"),
    //   steering: Yup.string().required("steering is required"),
    //   color: Yup.string().required("color is required"),
    //   suspension: Yup.string().required("suspension is required"),
    //   grossVehicleWeight: Yup.string().required("Gross Vehicle Weight is required"),
    //   transmissionType: Yup.string().required("Transmission Type is required"),
    //   noofSpeeds: Yup.string().required("Number of Speeds is required"),
    //   typeofRearAxles: Yup.string().required("Number of Rear Axles is required"),
    //   frontAxleWeight: Yup.string().required("Front Axle Weight is required"),
    //   backAxleWeight: Yup.string().required("Rear Axle Weight is required"),
    // }),
    onSubmit: async (values) => {
      const formData = new FormData();
      for (let key in values) {
        if (values[key] !== null) {
          formData.append(key, values[key]);
        }
      }

      try {
        await truckService.createTruck(formData);
        toast.success('Truck listed successfully!');
        formik.resetForm();
        setImage(null);
        setPreviewUrl(null);
      } catch (error) {
        toast.error(error?.response?.data?.error || 'Listing failed');
        console.error('Listing error:', error);
      }
    },
  });

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files).slice(0, 5)); // limit to 5
    }
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    onFilesSelected(files);
  };



  return (
    <div className='py-[65px]'>
      <div className='max-w-[1147px] mx-auto bg-white rounded-[20px] md:px-[79px] md:py-[65px] p-4 shadow'>
        <h2 className='text-2xl sm:text-[32px] font-bold leading-[61px] pb-[45px]'>List your vehicle</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Vehicle Details */}
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="vehicleName">Vehicle Name</label>
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
                <label className="label" htmlFor="vehiclePrice">Vehicle Price</label>
                <input
                  type="text"
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

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="truckCategory">Truck Category</label>
                <select
                  name="truckCategory"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.truckCategory}
                >
                  <option value="" disabled>Select Truck Type</option>
                  <option value="Flatbed">Flatbed</option>
                  <option value="Refrigerated">Refrigerated</option>
                  <option value="Dry Van">Dry Van</option>
                  <option value="Tanker">Tanker</option>
                  <option value="Lowboy">Lowboy</option>
                  <option value="Box Truck">Box Truck</option>
                </select>
                {formik.errors.truckCategory && formik.touched.truckCategory && (
                  <div className="text-red-500 text-sm">{formik.errors.truckCategory}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="listingType">Listing Type</label>
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
                <label className="label">Country</label>
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

              {formik.values.country === 'United States' ? (
                <div className='mb-9'>
                  <label className="label">State/Region</label>
                  <RegionDropdown
                    country={formik.values.country}
                    value={formik.values.state}
                    onChange={(val) => formik.setFieldValue('state', val)}
                    className='input'
                  />
                  {formik.errors.state && formik.touched.state && (
                    <div className="text-red-500 text-sm">{formik.errors.state}</div>
                  )}
                </div>
              )
                : <div></div>
              }

              <div >
                <label
                  htmlFor="upload"
                  onDragEnter={handleDrag}
                  className={`border-dashed border-2 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <IoImage color='text-gray-500 ' fontSize={20} />
                    <p className="text-gray-500 mt-2 font-medium">
                      Drag or Click to upload media
                    </p>
                    <p className="text-sm text-gray-400">(Upload only 5 images)</p>
                  </div>
                  <input
                    type="file"
                    id="upload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>

              </div>
            </div>
          </div>

          {/* Personal Info */}
          <h3 className="mt-9 bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Personal Info</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="name">Name</label>
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
              <label className="label" htmlFor="phone">phone</label>
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
              <label className="label" htmlFor="email">Email</label>
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
              <label className="label" htmlFor="companyName">Company Name</label>
              <input
                type="text"
                name='companyName'
                placeholder="Enter your Company Name"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.companyName}
              />
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
          <h3 className="bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">General</h3>
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="modelYear">Model Year </label>
                <input
                  type="number"
                  name='modelYear'
                  placeholder="Enter Model Year"
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
                {formik.errors.mileage && formik.touched.mileage && (
                  <div className="text-red-500 text-sm">{formik.errors.mileage}</div>
                )}
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="VehicleManufacturer">Vehicle Manufacturer</label>
                <select
                  name="VehicleManufacturer"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.VehicleManufacturer}
                >
                  <option value="" disabled>Select Vehicle Manufacturer</option>
                  <option value="Hyundia">Hyundia</option>
                  <option value="KIA">KIA</option>
                  <option value="Isuzu">Isuzu</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Hino">Hino</option>
                </select>
                {formik.errors.VehicleManufacturer && formik.touched.VehicleManufacturer && (
                  <div className="text-red-500 text-sm">{formik.errors.VehicleManufacturer}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="hours">hours</label>
                <input
                  type="text"
                  name='hours'
                  placeholder="Enter Hours"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.hours}
                />
                {formik.errors.hours && formik.touched.hours && (
                  <div className="text-red-500 text-sm">{formik.errors.hours}</div>
                )}
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
                {formik.errors.vin && formik.touched.vin && (
                  <div className="text-red-500 text-sm">{formik.errors.vin}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="condition">condition</label>
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
          <h3 className="bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Vehicle Info</h3>
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
                {formik.errors.wheelbase && formik.touched.wheelbase && (
                  <div className="text-red-500 text-sm">{formik.errors.wheelbase}</div>
                )}
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
                {formik.errors.steering && formik.touched.steering && (
                  <div className="text-red-500 text-sm">{formik.errors.steering}</div>
                )}
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
                {formik.errors.color && formik.touched.color && (
                  <div className="text-red-500 text-sm">{formik.errors.color}</div>
                )}
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
                {formik.errors.suspension && formik.touched.suspension && (
                  <div className="text-red-500 text-sm">{formik.errors.suspension}</div>
                )}
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
                {formik.errors.engineManufacturer && formik.touched.engineManufacturer && (
                  <div className="text-red-500 text-sm">{formik.errors.engineManufacturer}</div>
                )}
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
                {formik.errors.engineModel && formik.touched.engineModel && (
                  <div className="text-red-500 text-sm">{formik.errors.engineModel}</div>
                )}
              </div>


              <div className='mb-9'>
                <label className="label" htmlFor="hoursPower">Hours Power</label>
                <input
                  type="number"
                  name='hoursPower'
                  placeholder="Enter your Hours Power"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.hoursPower}
                />
                {formik.errors.hoursPower && formik.touched.hoursPower && (
                  <div className="text-red-500 text-sm">{formik.errors.hoursPower}</div>
                )}
              </div>
            </div>

            <div className="mb-9">
              <label className="label" htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter your Description"
                className="w-full p-2 shadow rounded-md resize-none"
                rows={7}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>


          </div>

          {/* Powertrain */}
          <h3 className="bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Powertrain</h3>
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
              {formik.errors.transmissionType && formik.touched.transmissionType && (
                <div className="text-red-500 text-sm">{formik.errors.transmissionType}</div>
              )}
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
              {formik.errors.noofSpeeds && formik.touched.noofSpeeds && (
                <div className="text-red-500 text-sm">{formik.errors.noofSpeeds}</div>
              )}
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="transmissionManufacturer">Transmission Manufacturer</label>
              <input
                type="text"
                name='transmissionManufacturer'
                placeholder="Enter Speed"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.transmissionManufacturer}
              />

            </div>
          </div>

          {/* Chassis */}
          <h3 className="bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Chassis</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="typeofRearAxles">Type of Axles</label>
              <select
                name="typeofRearAxles"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.typeofRearAxles}
              >
                <option value="" disabled>Select axle type</option>
                <option value="Hyundia">Hyundia</option>
                <option value="KIA">KIA</option>
              </select>
              {formik.errors.typeofRearAxles && formik.touched.typeofRearAxles && (
                <div className="text-red-500 text-sm">{formik.errors.typeofRearAxles}</div>
              )}
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
            {formik.isSubmitting ? 'Listing...' : 'List Truck'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTruckPage;