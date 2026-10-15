import React, { useState } from 'react';
import { FaRegFlag } from 'react-icons/fa';
import toast from 'react-hot-toast';
import truckService from '../../../../services/truckService';

// Must match REPORT_REASONS on the server
const REASONS = [
  'Spam or scam',
  'Misleading information',
  'Offensive content',
  'Already sold or no longer available',
  'Other',
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "Report this listing" link and its popup. The report is emailed to the Truckby team.
const ReportListing = ({ truckId }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');

  const reset = () => {
    setReason('');
    setDetails('');
    setEmail('');
    setFormError('');
  };

  const handleCancel = () => {
    if (sending) return;
    setOpen(false);
    reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    const trimmedEmail = email.trim();
    if (!reason) {
      setFormError('Please choose a reason.');
      return;
    }
    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
      setFormError('Please enter a valid email address!');
      return;
    }

    const payload = { reason };
    if (details.trim()) payload.details = details.trim();
    if (trimmedEmail) payload.email = trimmedEmail;

    setFormError('');
    setSending(true);
    try {
      const response = await truckService.reportTruck(truckId, payload);
      setOpen(false);
      reset();
      toast.success(response?.message || "Thanks, we'll review this listing.");
    } catch (error) {
      const message = error?.response?.data?.error;
      setFormError(typeof message === 'string' ? message : 'Failed to send the report. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (!truckId) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 mt-4 text-sm text-gray-500 underline cursor-pointer hover:text-gray-700"
      >
        <FaRegFlag />
        Report this listing
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000049] z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Report this listing</h2>

            <p className="font-semibold text-sm mb-2">Reason</p>
            <div className="space-y-2 mb-4">
              {REASONS.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="reportReason"
                    value={item}
                    checked={reason === item}
                    onChange={() => setReason(item)}
                    disabled={sending}
                    className="accent-[#DF0805]"
                  />
                  {item}
                </label>
              ))}
            </div>

            <label htmlFor="reportDetails" className="block font-semibold text-sm mb-2">Details (optional)</label>
            <textarea
              id="reportDetails"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Tell us what's wrong with this listing"
              maxLength={1000}
              disabled={sending}
              className="w-full border border-gray-300 p-2 mb-3 rounded h-24"
            />

            <label htmlFor="reportEmail" className="block font-semibold text-sm mb-2">Your email (optional)</label>
            <input
              id="reportEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="So we can follow up with you"
              disabled={sending}
              className="w-full border border-gray-300 p-2 mb-3 rounded"
            />

            {formError && <p className="text-[#DF0805] text-sm mb-3">{formError}</p>}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={sending}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending}
                className="px-4 py-2 bg-[#DF0805] text-white rounded hover:bg-[#BF0605] cursor-pointer disabled:opacity-60"
              >
                {sending ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ReportListing;
