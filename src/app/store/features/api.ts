import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store/store.ts';
import { AuthTokenResponse_T, LoginUser_T, User_T } from '@/types/models.ts';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://test-blog-api.ficuslife.com/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthTokenResponse_T, LoginUser_T>({
      query: (arg) => ({
        url: '/auth',
        method: 'POST',
        body: arg,
      }),
    }),
    userInfo: builder.query<User_T, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useUserInfoQuery } = api;
