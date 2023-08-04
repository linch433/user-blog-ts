import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://test-blog-api.ficuslife.com/api/v1',
    // prepareHeaders: headers => {}
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (arg) => ({
        url: '/auth',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
