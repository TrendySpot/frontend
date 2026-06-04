import AxiosInstance from "./axios";

const spotApi = {
  getSpots: (params) =>
    AxiosInstance.get("/spots", { params }),

  getSpotDetail: (spotId) =>
    AxiosInstance.get(`/spots/${spotId}`),

  searchSpots: (params) =>
    AxiosInstance.get("/spots/search", { params }),

  toggleWishlist: (spotId) =>
    AxiosInstance.post(`/spots/${spotId}/wishlist`),
};

export default spotApi;