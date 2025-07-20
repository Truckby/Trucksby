import { useNavigate } from 'react-router-dom';

const InventoryFallback = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-xl mx-auto text-center py-20 px-4">
            <h1 className="text-3xl font-bold mb-4">Seller Not Found</h1>
            <p className="text-gray-600 mb-6">
                The seller you’re looking for may no longer exist, or the link you followed might be incorrect.
                Please check the URL or return to the Home page to browse available sellers.
            </p>

            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
                Back To Home
            </button>
        </div>
    );
};

export default InventoryFallback;
