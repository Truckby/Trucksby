import React, { useState } from 'react';
import './style.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import truckService from '../../../services/truckService';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const AddTruckPage = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const user = useSelector((state) => state.user.user);

  const formik = useFormik({
    initialValues: {
      user: user._id,
      vehicleName: "",
      vehiclePrice: "",
      truckCategory: "",
      location: "",
      name: "",
      phone: "",
      email: "",
      modelYear: "",
      mileage: "",
      VehicleManufacturer: "",
      hours: "",
      vin: "",
      condition: "",
      payload: "",
      gwr: "",
      wheelbase: "",
      steering: "",
      color: "",
      suspension: "",
      grossVehicleWeight: "",
      transmissionType: "",
      noofSpeeds: "",
      numberofRearAxles: "",
      frontAxleWeight: "",
      rearAxleWeight: "",
    },
    validationSchema: Yup.object({
      vehicleName: Yup.string().required("Vehicle name is required"),
      vehiclePrice: Yup.number().typeError("Must be a number").required("Vehicle price is required"),
      truckCategory: Yup.string().required("Truck category is required"),
      location: Yup.string().required("location is required"),
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("phone is required"),
      email: Yup.string().email("Invalid email").required("email is required"),
      modelYear: Yup.string().required("Model year is required"),
      mileage: Yup.string().required("mileage is required"),
      VehicleManufacturer: Yup.string().required("Manufacturer is required"),
      hours: Yup.string().required("hours are required"),
      vin: Yup.string().required("vin is required"),
      condition: Yup.string().required("condition is required"),
      payload: Yup.string().required("payload is required"),
      gwr: Yup.string().required("gwr is required"),
      wheelbase: Yup.string().required("wheelbase is required"),
      steering: Yup.string().required("steering is required"),
      color: Yup.string().required("color is required"),
      suspension: Yup.string().required("suspension is required"),
      grossVehicleWeight: Yup.string().required("Gross Vehicle Weight is required"),
      transmissionType: Yup.string().required("Transmission Type is required"),
      noofSpeeds: Yup.string().required("Number of Speeds is required"),
      numberofRearAxles: Yup.string().required("Number of Rear Axles is required"),
      frontAxleWeight: Yup.string().required("Front Axle Weight is required"),
      rearAxleWeight: Yup.string().required("Rear Axle Weight is required"),
    }),
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
                <input
                  type="text"
                  name='truckCategory'
                  placeholder="Select Truck Type"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.truckCategory}
                />
                {formik.errors.truckCategory && formik.touched.truckCategory && (
                  <div className="text-red-500 text-sm">{formik.errors.truckCategory}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="location">location</label>
                <input
                  type="text"
                  name='location'
                  placeholder="Select location"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                />
                {formik.errors.location && formik.touched.location && (
                  <div className="text-red-500 text-sm">{formik.errors.location}</div>
                )}
              </div>

              <div>
                <label
                  htmlFor="upload"
                  onDragEnter={handleDrag}
                  className={`border-dashed border-2 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                    }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src="https://www.svgrepo.com/show/474865/image-upload.svg"
                      alt="upload icon"
                      className="w-12 h-12 opacity-50"
                    />
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
          <h3 className="bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Personal Info</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="name">Name</label>
              <input
                type="text"
                name='name'
                placeholder="Enter your name"
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
                type="text"
                name='phone'
                placeholder="Enter phone number"
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
              <label className="label" htmlFor="email">email</label>
              <input
                type="email"
                name='email'
                placeholder="Enter your email"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
          </div>

          {/* General Info */}
          <h3 className="bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">General</h3>
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="modelYear">Model Year </label>
                <input
                  type="text"
                  name='modelYear'
                  placeholder="Enter model year"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.modelYear}
                />
                {formik.errors.modelYear && formik.touched.modelYear && (
                  <div className="text-red-500 text-sm">{formik.errors.modelYear}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="mileage">mileage</label>
                <input
                  type="text"
                  name='mileage'
                  placeholder="Enter mileage"
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
                <input
                  type="text"
                  name='VehicleManufacturer'
                  placeholder="Enter vehicle manufacturer"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.VehicleManufacturer}
                />
                {formik.errors.VehicleManufacturer && formik.touched.VehicleManufacturer && (
                  <div className="text-red-500 text-sm">{formik.errors.VehicleManufacturer}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="hours">hours</label>
                <input
                  type="text"
                  name='hours'
                  placeholder="Enter hours"
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
                <label className="label" htmlFor="vin">vin</label>
                <input
                  type="text"
                  name='vin'
                  placeholder="Enter your vehicle name"
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
                <input
                  type="text"
                  name='condition'
                  placeholder="Enter your condition"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.condition}
                />
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
                <label className="label" htmlFor="payload">payload </label>
                <input
                  type="text"
                  name='payload'
                  placeholder="Enter your payload"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.payload}
                />
                {formik.errors.payload && formik.touched.payload && (
                  <div className="text-red-500 text-sm">{formik.errors.payload}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="gwr">gwr</label>
                <input
                  type="text"
                  name='gwr'
                  placeholder="Enter gwr"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.gwr}
                />
                {formik.errors.gwr && formik.touched.gwr && (
                  <div className="text-red-500 text-sm">{formik.errors.gwr}</div>
                )}
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="wheelbase">wheelbase</label>
                <input
                  type="text"
                  name='wheelbase'
                  placeholder="Enter wheelbase"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.wheelbase}
                />
                {formik.errors.wheelbase && formik.touched.wheelbase && (
                  <div className="text-red-500 text-sm">{formik.errors.wheelbase}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="steering">steering</label>
                <input
                  type="text"
                  name='steering'
                  placeholder="Enter your steering"
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
                <label className="label" htmlFor="color">color</label>
                <input
                  type="text"
                  name='color'
                  placeholder="Enter your color"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.color}
                />
                {formik.errors.color && formik.touched.color && (
                  <div className="text-red-500 text-sm">{formik.errors.color}</div>
                )}
              </div>

              <div className='mb-9'>
                <label className="label" htmlFor="suspension">suspension</label>
                <input
                  type="text"
                  name='suspension'
                  placeholder="Enter your suspension"
                  className="input"
                  onChange={formik.handleChange}
                  value={formik.values.suspension}
                />
                {formik.errors.suspension && formik.touched.suspension && (
                  <div className="text-red-500 text-sm">{formik.errors.suspension}</div>
                )}
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div className='mb-9'>
                <label className="label" htmlFor="grossVehicleWeight">Gross Vehicle Weight</label>
                <input
                  type="text"
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
          </div>

          {/* Powertrain */}
          <h3 className="bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Powertrain</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="transmissionType">Transmission Type</label>
              <input
                type="text"
                name='transmissionType'
                placeholder="Enter your type"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.transmissionType}
              />
              {formik.errors.transmissionType && formik.touched.transmissionType && (
                <div className="text-red-500 text-sm">{formik.errors.transmissionType}</div>
              )}
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="noofSpeeds">No of Speeds</label>
              <input
                type="text"
                name='noofSpeeds'
                placeholder="Enter speed"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.noofSpeeds}
              />
              {formik.errors.noofSpeeds && formik.touched.noofSpeeds && (
                <div className="text-red-500 text-sm">{formik.errors.noofSpeeds}</div>
              )}
            </div>
          </div>

          {/* Chassis */}
          <h3 className="bg-gray-800 text-white text-lg sm:text-2xl mb-10 h-[54px] pl-3 sm:pl-6 items-center flex font-semibold rounded-[5px]">Chassis</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div className='mb-9'>
              <label className="label" htmlFor="numberofRearAxles">Number of Rear Axles</label>
              <input
                type="text"
                name='numberofRearAxles'
                placeholder="Enter your number"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.numberofRearAxles}
              />
              {formik.errors.numberofRearAxles && formik.touched.numberofRearAxles && (
                <div className="text-red-500 text-sm">{formik.errors.numberofRearAxles}</div>
              )}
            </div>

            <div className='mb-9'>
              <label className="label" htmlFor="frontAxleWeight">Front Axle Weight</label>
              <input
                type="text"
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
              <label className="label" htmlFor="rearAxleWeight">Rear Axle Weight</label>
              <input
                type="text"
                name='rearAxleWeight'
                placeholder="e.g lbs"
                className="input"
                onChange={formik.handleChange}
                value={formik.values.rearAxleWeight}
              />
              {formik.errors.rearAxleWeight && formik.touched.rearAxleWeight && (
                <div className="text-red-500 text-sm">{formik.errors.rearAxleWeight}</div>
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