import React from 'react'
import alarm from '../../../../assets/images/ExpirePlan.svg'
import { Link } from 'react-router'

const ExpirePlan = () => {
    return (
        <div className='h-[700px] w-full flex flex-col justify-center items-center'>
            <img src={alarm} alt="alarm" className='w-[95px] h-[95px] object-cover' />
            <h3 className='text-[24px] sm:text-[32px] font-bold py-4'>Your plan has expired</h3>
            <p className='text-lg font-medium'>Upgrade your plan now</p>
            <Link
                to="/seller/plans"
                className="px-4 py-2 mt-6 bg-[#DF0805] text-white font-medium rounded-lg"
            >
                Upgrade Now
            </Link>
        </div>
    )
}

export default ExpirePlan
