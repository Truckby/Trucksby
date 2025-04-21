import React from 'react'
import tick from '../../../assets/images/tick.svg'

const plansData = [
    {
        name: "Free",
        price: "Free",
        billing: "/Lifetime",
        features: [
            "Advanced Analytics",
            "Business Branding",
            "Highlighted Listing Badge",
            "Chat Support",
            "Email Support",
        ],
        button: "Choose This Plan",
    },
    {
        name: "$25",
        price: "$25",
        billing: "/Month",
        features: [
            "50 Pages",
            "Advanced Analytics",
            "Business Branding",
            "Highlighted Listing Badge",
            "Top Search Visibility",
            "Chat Support",
            "Email Support",
            "Financing Options",
            "Truck Inspection Services",
            "Warranty & Insurance",
        ],
        button: "Choose This Plan",
    },
];

const allFeatures = [
    "Unlimited Listings",
    "Advanced Analytics",
    "Business Branding",
    "Highlighted Listing Badge",
    "Top Search Visibility",
    "Chat Support",
    "Email Support",
    "Financing Options",
    "Truck Inspection Services",
    "Warranty & Insurance",
];

const Plans = () => {
    return (
        <div className='my-16 p-8 sm:p-16 max-w-[1147px] mx-auto shadow rounded-[20px] bg-white'>
            <h3 className='text-[24px] sm:text-[32px] font-bold pb-10'>Your plan has expired</h3>

            <div className="overflow-x-auto">
                <table className="w-full border border-[#E6E9F5] text-center table-auto">
                    <thead>
                        <tr className="">
                            <th className="text-left px-4 py-3 border border-[#E6E9F5]">
                                <div className='flex items-center'>
                                    Compare plans
                                    <span className='ml-3 py-1.5 px-4 rounded-full border text-sm'>40% Off</span>
                                </div>
                            </th>
                            {plansData.map((plan, idx) => (
                                <th key={idx} className="px-4 py-3 border border-[#E6E9F5]">
                                    <div className="text-xl font-semibold">{plan.price}</div>
                                    <div className="text-gray-500">{plan.billing}</div>
                                    <button
                                        className={`mt-2 px-4 py-2 text-white rounded w-full ${idx === 0 ? 'bg-gray-900' : 'bg-gray-400'
                                            }`}
                                    >
                                        {plan.button}
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-left px-4 py-3 border border-[#E6E9F5] font-medium">Plan</td>
                            {plansData.map((plan, idx) => (
                                <td key={idx} className="px-4 py-3 border border-[#E6E9F5] font-semibold">
                                    {plan.name}
                                </td>
                            ))}
                        </tr>

                        {allFeatures.map((feature, idx) => (
                            <tr key={idx}>
                                <td className="text-left px-4 py-3 border border-[#E6E9F5] ">{feature}</td>
                                {plansData.map((plan, i) => (
                                    <td key={i} className="px-4 py-3 border border-[#E6E9F5]">
                                        {plan.features.includes(feature) ? (
                                            <span className="text-lg"><img src={tick} alt="tick" className='w-4 h-auto mx-auto' /></span>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Plans
