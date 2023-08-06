import { api } from '@/app/store/features/api.ts';
import { NewUser_T, User_T, UserQuery_T } from '@/types/models.ts';
import { UpdateUserArgs_T, UploadImageArgs_T } from '@/types/queries.ts';

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
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<User_T, Partial<NewUser_T>>({
      query: (args) => ({
        url: '/users',
        method: 'POST',
        body: args,
      }),
    }),
    updateUserById: builder.mutation<User_T, UpdateUserArgs_T>({
      query: ({ args, body }) => ({
        url: `/users/${args}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUserImageById: builder.mutation<User_T, UploadImageArgs_T>({
      query: ({ args, fileData }) => ({
        url: `/users/upload/${args}`,
        method: 'PUT',
        body: fileData,
      }),
      invalidatesTags: ['Users'],
    }),
    getUserById: builder.query<User_T, string>({
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
