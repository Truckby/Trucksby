import React, { useState } from 'react'
import './style.css'

const AddTruckPage = () => {
  const [formData, setFormData] = useState({
    VehicleName: "",
    VehiclePrice: "",
    TruckCategory: "",
    Location: "",
    UploadImages: null, // Store file data as null initially
    Name: "",
    Phone: "",
    Email: "",
    ModelYear: "",
    Mileage: "",
    VehicleManufacturer: "",
    Hours: "",
    VIN: "",
    Condition: "",
    Payload: "",
    GWR: "",
    Wheelbase: "",
    Steering: "",
    Color: "",
    Suspension: "",
    GrossVehicleWeight: "",
    TransmissionType: "",
    NoofSpeeds: "",
    NumberofRearAxles: "",
    FrontAxleWeight: "",
    RearAxleWeight: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = new FormData();
    
    // Convert state data to FormData
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    // Log form data to check
    console.log("Form Submitted:", Object.fromEntries(submitData.entries()));
  };

  
  return (
    <div className='py-[65px]'>
      <div className='max-w-[1147px] mx-auto bg-white rounded-[20px] md:px-[79px] md:py-[65px] p-4 shadow'>
        <h2 className='text-[32px] font-bold leading-[61px] pb-[45px]'>List your vehicle</h2>

        <form onSubmit={handleSubmit}>
          {/* Vehicle Details */}
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="VehicleName">Vehicle Name</label>
                <input type="text" name="VehicleName" placeholder="Enter your vehicle name" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="VehiclePrice">Vehicle Price</label>
                <input type="text" name='VehiclePrice' placeholder="$" className="input" onChange={handleChange} />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="TruckCategory">Truck Category</label>
                <input type="text" name='TruckCategory' placeholder="Select Truck Type" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="Location">Location</label>
                <input type="text" name='Location' placeholder="Select Location" className="input" onChange={handleChange} />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="UploadImages">Upload Images</label>
                <input type="text" name='UploadImages' placeholder="Enter your vehicle name" className="input" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">Personal Info</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="Name">Name</label>
              <input type="text" name='Name' placeholder="Enter your name" className="input" onChange={handleChange} />
            </div>

            <div>
              <label className="label" htmlFor="Phone">Phone</label>
              <input type="text" name='Phone' placeholder="Enter phone number" className="input" onChange={handleChange} />
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="Email">Email</label>
              <input type="email" name='Email' placeholder="Enter your email" className="input" onChange={handleChange} />
            </div>
          </div>

          {/* General Info */}
          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">General</h3>
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="ModelYear">Model Year </label>
                <input type="text" name='ModelYear' placeholder="Enter model year" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="Mileage">Mileage</label>
                <input type="text" name='Mileage' placeholder="Enter mileage" className="input" onChange={handleChange} />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="VehicleManufacturer">Vehicle Manufacturer</label>
                <input type="text" name='VehicleManufacturer' placeholder="Enter vehicle manufacturer" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="Mileage">Hours</label>
                <input type="text" name='Hours' placeholder="Enter Hours" className="input" onChange={handleChange} />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="VIN">VIN</label>
                <input type="text" name='VIN' placeholder="Enter your vehicle name" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="Condition">Condition</label>
                <input type="text" name='Condition' placeholder="Enter your condition" className="input" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">Vehicle Info</h3>
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="Payload">Payload </label>
                <input type="text" name='Payload' placeholder="Enter your Payload" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="GWR">GWR</label>
                <input type="text" name='GWR' placeholder="Enter GWR" className="input" onChange={handleChange} />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="Wheelbase">Wheelbase</label>
                <input type="text" name='Wheelbase' placeholder="Enter wheelbase" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="Steering">Steering</label>
                <input type="text" name='Steering' placeholder="Enter your Steering" className="input" onChange={handleChange} />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="Color">Color</label>
                <input type="text" name='Color' placeholder="Enter your Color" className="input" onChange={handleChange} />
              </div>

              <div>
                <label className="label" htmlFor="Suspension">Suspension</label>
                <input type="text" name='Suspension' placeholder="Enter your suspension" className="input" onChange={handleChange} />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="GrossVehicleWeight">Gross Vehicle Weight</label>
                <input type="text" name='GrossVehicleWeight' placeholder="e.g Heavy Weight" className="input" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Price & Finalize */}
          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">Powertrain</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="TransmissionType">Transmission Type</label>
              <input type="text" name='TransmissionType' placeholder="Enter your type" className="input" onChange={handleChange} />
            </div>

            <div>
              <label className="label" htmlFor="NoofSpeeds">No of Speeds</label>
              <input type="text" name='NoofSpeeds' placeholder="Enter speed" className="input" onChange={handleChange} />
            </div>
          </div>

          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">Chassis</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="NumberofRearAxles">Number of Rear Axles</label>
              <input type="text" name='NumberofRearAxles' placeholder="Enter your number" className="input" onChange={handleChange} />
            </div>

            <div>
              <label className="label" htmlFor="FrontAxleWeight">Front Axle Weight</label>
              <input type="text" name='FrontAxleWeight' placeholder="e.g lbs" className="input" onChange={handleChange} />
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="RearAxleWeight">Rear Axle Weight</label>
              <input type="text" name='RearAxleWeight' placeholder="e.g lbs" className="input" onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="bg-[#DF0805] text-white rounded-[10px] cursor-pointer mt-4 h-[54px] w-[214px] flex justify-center items-center ml-auto">List Truck</button>
        </form>
      </div>
    </div>
  )
}

export default AddTruckPage