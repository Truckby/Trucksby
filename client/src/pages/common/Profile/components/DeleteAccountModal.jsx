import React, { useEffect, useState } from 'react';
import CustomModal from '../../../../components/CustomModal/CustomModal';

// Asks for the password before deleting the account
const DeleteAccountModal = ({ isOpen, deleting, error, onClose, onConfirm }) => {
    const [password, setPassword] = useState('');

    // Start empty every time the modal opens
    useEffect(() => {
        if (isOpen) setPassword('');
    }, [isOpen]);

    const canDelete = password.trim().length > 0 && !deleting;

    const handleClose = () => {
        if (!deleting) onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (canDelete) onConfirm(password);
    };

    return (
        <CustomModal isOpen={isOpen} onRequestClose={handleClose} width={'480px'} contentLabel="Delete Account">
            <form onSubmit={handleSubmit} className="px-2 py-8 sm:px-6">
                <h2 className="text-[26px] font-bold text-center">Delete Account</h2>

                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                    This permanently deletes your account, your listings and their photos.
                    If you have an active plan, it ends immediately and the remaining time
                    isn't refunded. This can't be undone.
                </p>

                <label htmlFor="deleteAccountPassword" className="block font-bold mt-6 mb-2">
                    Enter your password to confirm
                </label>
                <input
                    id="deleteAccountPassword"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full h-[48px] px-4 border border-gray-300 rounded-[10px] outline-none focus:border-gray-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={deleting}
                />

                {error && <p className="text-red-600 text-sm mt-3">{error}</p>}

                <div className="flex justify-center gap-3 mt-8">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={deleting}
                        className="cursor-pointer px-4 py-2 bg-gray-500 w-[131px] h-[48px] text-white rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!canDelete}
                        className="cursor-pointer px-4 py-2 bg-[#D74042] w-[131px] h-[48px] text-white rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </form>
        </CustomModal>
    );
};

export default DeleteAccountModal;
