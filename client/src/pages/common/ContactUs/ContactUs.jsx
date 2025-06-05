import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router'

const ContactUs = () => {
  const user = useSelector((state) => state.user.user);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-20">
            <h1 className="text-4xl font-bold mb-6">Contact truckby.com</h1>

            <div className="space-y-4 text-gray-800">
                <p>
                    Looking for parts?{' '}
                    <Link to="/" className="text-blue-600 hover:underline">
                        Find Parts
                    </Link>
                </p>
                <p>
                    Have something for sale?{' '}
                    <Link to={user?.email ? "/listing" : "/login"} className="text-blue-600 hover:underline">
                        Sell Your Equipment
                    </Link>
                </p>
                {/* <p>
                    Would you like to leave us an email message?{' '}
                    <Link to="#" className="text-blue-600 hover:underline">
                        Send Us A Feedback Email
                    </Link>
                </p> */}
                <p className="text-sm text-gray-600">
                    (Please include a phone or fax number in your message in case it is impossible to reply to you by return email.)
                </p>
                <p>
                    We encourage you to contact us at any time with questions or comments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-8 mt-10">
                <div>
                    <h2 className="font-semibold">Address</h2>
                    <p>P.O. Box 85670</p>
                    <p>Lincoln, NE 68501-5670</p>
                    <p className="font-semibold mt-2">Or</p>
                    <p>120 W. Harvest Drive</p>
                    <p>Lincoln, NE 68521</p>
                </div>

                <div>
                    <h2 className="font-semibold">Advertising</h2>
                    <p>(800) 247-4868</p>
                    <p>(402) 479-2140</p>
                    <p>Fax: (402) 479-2134</p>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
