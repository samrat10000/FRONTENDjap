import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a local interface to break the circular dependency with RootState
interface AuthState {
  auth: {
    token: string | null;
  };
}

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Use the local type to access the token
      const token = (getState() as AuthState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Restaurants', 'VendorRestaurants', 'User'],
  endpoints: () => ({}),
});
