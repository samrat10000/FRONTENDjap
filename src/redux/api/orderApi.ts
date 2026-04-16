import { baseApi } from './baseApi';

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  _id?: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt?: string;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['User'],
    }),
    getMyOrders: builder.query<Order[], void>({
      query: () => '/orders/myorders',
    }),
  }),
});

export const { useCreateOrderMutation, useGetMyOrdersQuery } = orderApi;
