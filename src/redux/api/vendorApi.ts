import { baseApi } from './baseApi';
import type { MenuItem, Restaurant } from './restaurantApi';

export const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorRestaurants: builder.query<Restaurant[], void>({
      query: () => '/restaurants/my/all',
      providesTags: ['VendorRestaurants'],
    }),
    createRestaurant: builder.mutation<Restaurant, Partial<Restaurant>>({
      query: (body) => ({
        url: '/restaurants',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VendorRestaurants'],
    }),
    updateRestaurant: builder.mutation<Restaurant, { restaurantId: string; body: Partial<Restaurant> }>({
      query: ({ restaurantId, body }) => ({
        url: `/restaurants/${restaurantId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['VendorRestaurants', 'Restaurants'],
    }),
    addMenuItem: builder.mutation<MenuItem, { restaurantId: string; item: Partial<MenuItem> }>({
      query: ({ restaurantId, item }) => ({
        url: `/restaurants/${restaurantId}/menu`,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Restaurants'],
    }),
    updateMenuItem: builder.mutation<
      MenuItem,
      { restaurantId: string; menuItemId: string; item: Partial<MenuItem> }
    >({
      query: ({ restaurantId, menuItemId, item }) => ({
        url: `/restaurants/${restaurantId}/menu/${menuItemId}`,
        method: 'PUT',
        body: item,
      }),
      invalidatesTags: ['Restaurants'],
    }),
    deleteMenuItem: builder.mutation<{ message: string; id: string }, { restaurantId: string; menuItemId: string }>({
      query: ({ restaurantId, menuItemId }) => ({
        url: `/restaurants/${restaurantId}/menu/${menuItemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Restaurants'],
    }),
  }),
});

export const {
  useGetVendorRestaurantsQuery,
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = vendorApi;
