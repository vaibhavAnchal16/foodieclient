const axios = require("axios");
const baseURL = "http://localhost:4000/api/";

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("access_token")) {
      request.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "access_token"
      )}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

function createAxiosResponseInterceptor(axiosInstance) {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Reject promise if usual error
      let authToken = localStorage.getItem("access_token");
      error.config.headers["x-access-token"] = `${authToken}`;
      console.log(error?.response?.status);
      if (error?.response?.status === 401) {
        // If Token is Invalid
        window.location.href = "/login";
        return axiosInstance();
      } else if (error?.response?.status === 403) {
        // const refreshToken = localStorage.getItem("refresh_token");
        // When token is expired
        axiosInstance.interceptors.response.eject(interceptor);
        // try {
        //   const response = await fetch(
        //     `${baseURL}customers/signin/refreshtoken/`,
        //     {
        //       method: "post",
        //       headers: {
        //         x-access-token: `${refreshToken}`,
        //       },
        //     }
        //   );
        //   const jsonResponse = await response.json();
        //   localStorage.setItem("access_token", jsonResponse?.data?.token);
        //   error.response.config.headers["x-access-token"] =
        //     jsonResponse?.data?.token;
        //   return axiosInstance(error.response.config);
        // } catch (error) {
        //   return Promise.reject(error);
        // } finally {
        //   createAxiosResponseInterceptor(axiosInstance);
        // }
      } else {
        return Promise.reject(error);
      }
    }
  );
}

createAxiosResponseInterceptor(AxiosInstance);

export default AxiosInstance;
