import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/truck";

const truckService = {
    createTruck: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllTrucks: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllTrucksWithFilter: async (combinedFilters) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/get-all`, {
                params: combinedFilters,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTruckById: async (id) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateTruck: async (id, payload) => {
        try {
            const response = await axiosInstance.put(`${BASE_URL}/${id}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteTruck: async (id) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default truckService;
