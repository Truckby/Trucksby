import React, { useEffect } from 'react';
import ReactGA from "react-ga4";

// Public page explaining how to delete a Truckby account. Google Play requires
// a web link for this that works without the app.
const DeleteAccountPage = () => {
    useEffect(() => {
        const VITE_ENV = import.meta.env.VITE_ENV;
        if (VITE_ENV === "production") {
            ReactGA.send({ hitType: "pageview", page: "/delete-account", title: "Delete Account Page" });
        }
    }, []);

    return (
        <div className='my-[65px] max-w-[1300px] mx-auto bg-white shadow rounded-[20px]'>
            <div className='p-6 md:px-[79px] md:py-[65px]'>
                <h1 className='text-[24px] sm:text-[32px] font-bold'>DELETE YOUR TRUCKBY ACCOUNT</h1>
                <p className='text-sm text-gray-500 mt-2'>Applies to accounts created on www.truckby.com and in the Truckby mobile app.</p>

                <div className='mt-8 space-y-6 text-sm md:text-base leading-relaxed text-gray-700'>
                    <section>
                        <h2 className='font-semibold text-lg mb-2'>1. DELETE ON THE WEBSITE</h2>
                        <ol className='list-decimal ml-6 mt-2 space-y-1'>
                            <li><a href='/login' className='text-blue-600 underline'>Log in</a> at www.truckby.com.</li>
                            <li>Open the account menu and click <strong>Profile</strong>.</li>
                            <li>Scroll down to <strong>Delete Account</strong> and click <strong>Delete my account</strong>.</li>
                            <li>Enter your password and click <strong>Delete</strong>.</li>
                        </ol>
                        <p className='mt-2'>Can't log in? Email <a href='mailto:info@truckby.com' className='text-blue-600 underline'>info@truckby.com</a> and we'll help you get access.</p>
                    </section>

                    <section>
                        <h2 className='font-semibold text-lg mb-2'>2. DELETE IN THE TRUCKBY APP</h2>
                        <ol className='list-decimal ml-6 mt-2 space-y-1'>
                            <li>Open the Truckby app and log in.</li>
                            <li>Open the menu and tap <strong>My Profile</strong>.</li>
                            <li>Scroll down to <strong>Delete Account</strong> and tap <strong>Delete my account</strong>.</li>
                            <li>Enter your password and tap <strong>Delete</strong>.</li>
                        </ol>
                        <p className='mt-2'>Either way, your account is deleted right away.</p>
                    </section>

                    <section>
                        <h2 className='font-semibold text-lg mb-2'>3. WHAT IS DELETED</h2>
                        <ul className='list-disc ml-6 mt-2 space-y-1'>
                            <li>Your profile: name, email, phone number, address, company name and profile photo</li>
                            <li>All your listings and their photos</li>
                            <li>Your login details</li>
                        </ul>
                        <p className='mt-2'>Any active subscription is cancelled immediately and will not renew. The remaining time on your current plan is not refunded, as described in our <a href='/privacy' className='text-blue-600 underline'>Return & Refund Policy</a>.</p>
                    </section>

                    <section>
                        <h2 className='font-semibold text-lg mb-2'>4. WHAT WE KEEP</h2>
                        <p>We keep a record of past subscription payments (plan, amount and dates) for accounting and business statistics. This record no longer contains your name or contact details. Our payment processor, Stripe, keeps its own payment records as required by law.</p>
                    </section>

                    <section>
                        <h2 className='font-semibold text-lg mb-2'>5. CONTACT</h2>
                        <p>Questions? Email <a href='mailto:info@truckby.com' className='text-blue-600 underline'>info@truckby.com</a>.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountPage;
