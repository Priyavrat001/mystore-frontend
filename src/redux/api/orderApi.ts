import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { key } from "../../utils/server";
import { AllOrdersResponse, MessageResponse, NewOrdertRequest, OrderDetailsResponse, UpdateOrdertRequest } from "../../types/api-types";


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
      baseUrl: `${key}/api/v1/order/`,
    }),
    tagTypes: ["orders"],
    endpoints: (builder) => ({
      newOrder: builder.mutation<MessageResponse, NewOrdertRequest>({
        query: (order) => ({
          url: "new",
          method: "POST",
          body: order,
        }),
        invalidatesTags: ["orders"],
      }),
      updateOrder: builder.mutation<MessageResponse, UpdateOrdertRequest>({
        query: ({orderId, userId}) => ({
          url: `${orderId}?id=${userId}`,
          method: "PUT"
        }),
        invalidatesTags: ["orders"],
      }),
      deleteOrder: builder.mutation<MessageResponse, UpdateOrdertRequest>({
        query: ({orderId, userId}) => ({
          url: `${orderId}?id=${userId}`,
          method: "Delete"
        }),
        invalidatesTags: ["orders"],
      }),
      myOrders: builder.query<AllOrdersResponse, string>({
        query: (id) => `my?id=${id}`,
        providesTags: ["orders"],
      }),
      allOrders: builder.query<AllOrdersResponse, string>({
        query: (id) => `all?id=${id}`,
        providesTags: ["orders"],
      }),
      orderDetails: builder.query<OrderDetailsResponse, string>({
        query: (id) => id,
        providesTags: ["orders"],
      }),
    }),
  });


export const {useNewOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation, useMyOrdersQuery, useOrderDetailsQuery, useAllOrdersQuery} = orderApi;