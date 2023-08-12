import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/store/store.ts';
import { ILoginUser } from '@/types/models.ts';
import { baseUrl } from '@/app/baseUrl';
import { clearToken } from '../slices/counterSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithHandler: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    localStorage.removeItem('AUTH_TOKEN');
    api.dispatch(clearToken);
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithHandler,
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        token: string;
      },
      ILoginUser
    >({
      query: (arg) => ({
        url: '/auth',
        method: 'POST',
        body: arg,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
