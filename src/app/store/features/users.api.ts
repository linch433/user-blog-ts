import { api } from '@/app/store/features/api.ts';
import { User_T, UserQuery_T } from '@/types/models.ts';

const usersApiWithTag = api.enhanceEndpoints({ addTagTypes: ['Users'] });

export const usersApi = usersApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User_T[], UserQuery_T>({
      query: (args) => ({
        url: `/users`,
        params: { ...args },
      }),
      transformResponse: (rawResult: { data: User_T[] }) => {
        return rawResult.data;
      },
    }),
    getUserById: builder.query<User_T, string>({
      query: (args) => ({
        url: `/users/${args}`,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
