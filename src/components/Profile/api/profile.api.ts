import { api } from '@/app/store/features/api.ts';
import { IUser } from '@/types/models.ts';

const profileApiWithTags = api.enhanceEndpoints({ addTagTypes: ['Users'] });

const profileApi = profileApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query<IUser, void>({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
  }),
});

export const { useUserInfoQuery } = profileApi;
