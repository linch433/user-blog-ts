import { api } from '@/app/store/features/api.ts';
import { User_T, UserQuery_T } from '@/types/models.ts';

export const usersApi = api.injectEndpoints({
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
  }),
});

export const { useGetUsersQuery } = usersApi;
