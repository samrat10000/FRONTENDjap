import { baseApi } from './baseApi';

export interface MenuItem {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  preparationTimeMinutes?: number;
  dietaryTags?: string[];
  ingredients?: string[];
  nutrition?: {
    calories?: number;
    spiceLevel?: 'mild' | 'medium' | 'hot' | 'very-hot';
  };
  sortOrder?: number;
  isAvailable?: boolean;
}

export interface Restaurant {
  _id?: string;
  id?: number;
  name: string;
  location?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  rating: number;
  distance?: string;
  price?: string;
  image?: string;
  coverImage?: string;
  category: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  cuisines?: string[];
  openingHours?: string[];
  deliveryAvailable?: boolean;
  pickupAvailable?: boolean;
  isActive?: boolean;
  menuItems?: MenuItem[];
}

export const restaurantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query<Restaurant[], void>({
      query: () => '/restaurants',
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Restaurants' as const, id: _id })), { type: 'Restaurants', id: 'LIST' }]
          : [{ type: 'Restaurants', id: 'LIST' }],
    }),
    getRestaurantById: builder.query<Restaurant, string>({
      query: (id) => `/restaurants/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Restaurants', id }],
    }),
  }),
});

export const { useGetRestaurantsQuery, useGetRestaurantByIdQuery } = restaurantApi;
