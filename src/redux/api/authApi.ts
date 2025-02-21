// Import the RegisterInput type from the register page component
import { RegisterInput } from "../../pages/register.page";
import { LoginInput } from "../../pages/login.page";
// Import the customFetchBase utility function
import customFetchBase from "./customFetchBase";
// Import the createApi and fetchBaseQuery functions from Redux Toolkit
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Import the GenericResponse type
import { GenericResponse } from "./types";

// Get the base URL for the backend server from the environment variables
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_ENDPOINT as string;

// Define the authentication API using Redux Toolkit
export const authApi = createApi({
  reducerPath: "authApi", // The path in the Redux store for this API
  baseQuery: customFetchBase, // The base query to use for requests
  endpoints: (builder) => ({
    // Define the registerUser mutation
    registerUser: builder.mutation<GenericResponse, RegisterInput>({
      query(data) {
        console.log("Performed");
        return {
          url: "auth/register", // The URL for the register endpoint
          method: "POST", // The HTTP method to use for the request
          body: data, // The data to send in the request body
        };
      },
    }),
    // Define the verifyEmail mutation
    verifyEmail: builder.mutation<GenericResponse, string>({
      query() {
        return {
          url: "auth/verifyemail", // The URL for the verify email endpoint
          credentials: "include", // Include cookies in the request
        };
      },
    }),
    // Define the loginUser mutation
    loginUser: builder.mutation<GenericResponse, LoginInput>({
      query(credentials) {
        return {
          url: "auth/login", // The URL for the login endpoint
          method: "POST", // The HTTP method to use for the request
          body: credentials, // The credentials to send in the request body
        };
      },
    }),
  }),
});

// Export the custom hooks generated by Redux Toolkit for the defined mutations
export const {
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useLoginUserMutation,
} = authApi;