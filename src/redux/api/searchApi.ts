import { baseApi } from './baseApi';
import { restaurants as mockRestaurants } from '../../utils/mockData';
import type { Restaurant } from './restaurantApi';

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchItems: builder.query<Restaurant[], string>({
      async queryFn(query) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        const filtered = mockRestaurants.filter((r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.category.toLowerCase().includes(query.toLowerCase())
        );
        return { data: filtered };
      },
    }),
  }),
});

export const { useSearchItemsQuery } = searchApi;
