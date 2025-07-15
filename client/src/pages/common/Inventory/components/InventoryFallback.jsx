import { useNavigate } from 'react-router-dom';

const InventoryFallback = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-xl mx-auto text-center py-20 px-4">
            <h1 className="text-3xl font-bold mb-4">Find a Seller’s Inventory</h1>
            <p className="text-gray-600 mb-6">It looks like you visited the inventory page without selecting a seller.</p>
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
