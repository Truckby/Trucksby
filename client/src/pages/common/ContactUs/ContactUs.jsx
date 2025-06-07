import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router'

const ContactUs = () => {
    const user = useSelector((state) => state.user.user);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-20">
            <h1 className="text-4xl font-bold mb-6">Contact Truckby.com</h1>

            <div className="space-y-4 text-gray-800">
                <p>
                    Looking for equipment?{' '}
                    <Link to="/" className="text-blue-600 hover:underline">
                        Find Equipment
                    </Link>
                </p>
                <p>
                    Have something for sale?{' '}
                    <Link to={user?.email ? "/seller/listing" : "/login"} className="text-blue-600 hover:underline">
                        Sell Your Equipment
                    </Link>
                </p>
                {/* <p>
                    Would you like to leave us an email message?{' '}
                    <Link to="#" className="text-blue-600 hover:underline">
                        Send Us A Feedback Email
                    </Link>
                </p> */}
                {/* <p className="text-sm text-gray-600">
                    (Please include a phone or fax number in your message in case it is impossible to reply to you by return email.)
                </p> */}
                <p>
                    We encourage you to contact us at any time with questions or comments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-8 mt-10">
                <div>
                    <h2 className="font-semibold">Address</h2>
                    <p>641 Clearlake Rd Suite# 17</p>
                    <p>Cocoa, FL 32922-6309</p>
                    <p className="font-semibold mt-2">Phone Number</p>
                    <p>352-284-6314</p>
                </div>

                <div>
                    <h2 className="font-semibold">Email</h2>
                    <p>info@truckby.com</p>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
