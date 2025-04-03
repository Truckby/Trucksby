import React from 'react'
import './style.css'

const AddTruckPage = () => {
  return (
    <div className='py-[65px]'>
      <div className='max-w-[1147px] mx-auto bg-white rounded-[20px] md:px-[79px] md:py-[65px] p-4 shadow'>
        <h2 className='text-[32px] font-bold leading-[61px] pb-[45px]'>List your vehicle</h2>

        <form action="" className=''>
          {/* Vehicle Details */}
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="VehicleName">Vehicle Name</label>
                <input type="text" placeholder="Enter your vehicle name" className="input" />
              </div>

              <div>
                <label className="label" htmlFor="VehiclePrice">Vehicle Price</label>
                <input type="text" placeholder="$" className="input" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="VehicleName">Truck Category</label>
                <input type="text" placeholder="Select Truck Type" className="input" />
              </div>

              <div>
                <label className="label" htmlFor="Mileage">Location</label>
                <input type="text" placeholder="Select Location" className="input" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="VehicleName">Upload Images</label>
                <input type="text" placeholder="Enter your vehicle name" className="input" />
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">Personal Info</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="Name">Name</label>
              <input type="text" placeholder="Enter your name" className="input" />
            </div>

            <div>
              <label className="label" htmlFor="Phone">Phone</label>
              <input type="text" placeholder="Enter phone number" className="input" />
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="Name">Email</label>
              <input type="email" placeholder="Enter your email" className="input" />
            </div>
          </div>

          {/* General Info */}
          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">General</h3>
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="ModelYear">Model Year </label>
                <input type="text" placeholder="Enter model year" className="input" />
              </div>

              <div>
                <label className="label" htmlFor="Mileage">Mileage</label>
                <input type="text" placeholder="Enter mileage" className="input" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="VehicleManufacturer">Vehicle Manufacturer</label>
                <input type="text" placeholder="Enter vehicle manufacturer" className="input" />
              </div>

              <div>
                <label className="label" htmlFor="Mileage">Hours</label>
                <input type="text" placeholder="Enter Hours" className="input" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="VIN">VIN</label>
                <input type="text" placeholder="Enter your vehicle name" className="input" />
              </div>

              <div>
                <label className="label" htmlFor="Condition">Condition</label>
                <input type="text" placeholder="Enter your condition" className="input" />
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">Vehicle Info</h3>
          <div className=''>
            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="Payload">Payload </label>
                <input type="text" placeholder="Enter your Payload" className="input" />
              </div>

              <div>
                <label className="label" htmlFor="GWR">GWR</label>
                <input type="text" placeholder="Enter GWR" className="input" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="Wheelbase">Wheelbase</label>
                <input type="text" placeholder="Enter wheelbase" className="input" />
              </div>

              <div>
                <label className="label" htmlFor="Steering">Steering</label>
                <input type="text" placeholder="Enter your Steering" className="input" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="Color">Color</label>
                <input type="text" placeholder="Enter your Color" className="input" />
              </div>

              <div>
                <label className="label" htmlFor="Suspension">Suspension</label>
                <input type="text" placeholder="Enter your suspension" className="input" />
              </div>
            </div>

            <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="GrossVehicleWeight">Gross Vehicle Weight</label>
                <input type="text" placeholder="e.g Heavy Weight" className="input" />
              </div>
            </div>
          </div>

          {/* Price & Finalize */}
          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">Powertrain</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="TransmissionType">Transmission Type</label>
              <input type="text" placeholder="Enter your type" className="input" />
            </div>

            <div>
              <label className="label" htmlFor="NoofSpeeds">No of Speeds</label>
              <input type="text" placeholder="Enter speed" className="input" />
            </div>
          </div>

          <h3 className="bg-gray-800 text-white text-2xl mb-10 h-[54px] pl-6 items-center flex font-semibold rounded-[5px]">Chassis</h3>
          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
            <div>
              <label className="label" htmlFor="NumberofRearAxles">Number of Rear Axles</label>
              <input type="text" placeholder="Enter your number" className="input" />
            </div>

            <div>
              <label className="label" htmlFor="FrontAxleWeight">Front Axle Weight</label>
              <input type="text" placeholder="e.g lbs" className="input" />
            </div>
          </div>

          <div className='grid md:grid-cols-2 md:space-x-[31px]'>
              <div>
                <label className="label" htmlFor="RearAxleWeight">Rear Axle Weight</label>
                <input type="text" placeholder="e.g lbs" className="input" />
              </div>
            </div>

          <button type="submit" className="bg-[#DF0805] text-white rounded-[10px] cursor-pointer mt-4 h-[54px] w-[214px] flex justify-center items-center ml-auto">List Truck</button>
        </form>
      </div>
    </div>
  )
}

export default AddTruckPage