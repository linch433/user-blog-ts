import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://test-blog-api.ficuslife.com/api/v1',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args) => ({
        url: `/users`,
        params: { ...args },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = api;
