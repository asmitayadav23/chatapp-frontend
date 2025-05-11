// src/redux/api/adminApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/admin/`,
    credentials: "include", // important to send cookies automatically
  }),
  tagTypes: ["AdminUser", "AdminChat", "AdminMessage", "AdminStats"],

  endpoints: (builder) => ({
    getAdminData: builder.query({
      query: () => ({
        url: "",
      }),
    }),

    allUsers: builder.query({
      query: () => ({
        url: "users",
      }),
      providesTags: ["AdminUser"],
    }),
    
    allChats: builder.query({
      query: () => ({
        url: "chats",
      }),
      providesTags: ["AdminChat"],
    }),

    allMessages: builder.query({
      query: () => ({
        url: "messages",
      }),
      providesTags: ["AdminMessage"],
    }),

    getDashboardStats: builder.query({
      query: () => ({
        url: "stats",
      }),
      providesTags: ["AdminStats"],
    }),
  }),
});

export default adminApi;

export const {
  useGetAdminDataQuery,
  useAllUsersQuery,
  useAllChatsQuery,
  useAllMessagesQuery,
  useGetDashboardStatsQuery,
} = adminApi;
