import { api } from '@/app/store/features/api.ts';
import { INewUser, IUser, IGeneralQuery } from '@/types/models.ts';
import { IQueriesArgs, IUploadImageArgs } from '@/types/queries.ts';

const usersApiWithTag = api.enhanceEndpoints({ addTagTypes: ['Users'] });

export const usersApi = usersApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], IGeneralQuery>({
      query: (args) => ({
        url: `/users`,
        params: { ...args },
      }),
      transformResponse: (rawResult: { data: IUser[] }) => {
        return rawResult.data;
      },
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<IUser, Partial<INewUser>>({
      query: (args) => ({
        url: '/users',
        method: 'POST',
        body: args,
      }),
    }),
    updateUserById: builder.mutation<IUser, IQueriesArgs>({
      query: ({ args, body }) => ({
        url: `/users/${args}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUserImageById: builder.mutation<IUser, IUploadImageArgs>({
      query: ({ args, fileData }) => ({
        url: `/users/upload/${args}`,
        method: 'PUT',
        body: fileData,
      }),
      invalidatesTags: ['Users'],
    }),
    getUserById: builder.query<IUser, string>({
      query: (args) => ({
        url: `/users/${args}`,
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserByIdMutation,
  useUpdateUserImageByIdMutation,
} = usersApi;
