import axiosInstance from "./axiosInstance";

const BASE_URL = "/api/user";

const userService = {
  loginUser: async (payload) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/login`, payload, {
        withCredentials: true,
        skipAuthRefresh: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // formData is a FormData with the signup fields and the optional "image" file
  registerUser: async (formData, userType) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/${userType}-register`,
        formData,
        {
          withCredentials: true,
          skipAuthRefresh: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (payload) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/forgot-password`,
        payload,
        { withCredentials: true, skipAuthRefresh: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (payload) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/reset-password`,
        payload,
        { withCredentials: true, skipAuthRefresh: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  refreshToken: async (payload) => {
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/refresh-token`,
        payload,
        { withCredentials: true, skipAuthRefresh: true }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  logoutUser: async (payload) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/logout`, payload, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserInfo: async () => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/fetch-user-info`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUserInfo: async (payload) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/update-user-info`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteAccount: async (payload) => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}/delete-account`, {
        data: payload,
        // Lets the server clear the refresh token cookie
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  changeUserPassword: async (payload) => {
    try {
      const response = await axiosInstance.patch(
        `${BASE_URL}/change-user-password`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
