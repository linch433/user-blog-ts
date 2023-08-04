import { api } from '@/app/store/features/api.ts';
import { Comments_T } from '@/types/models.ts';

const commentsApiWithTags = api.enhanceEndpoints({ addTagTypes: ['Comments'] });

export const commentsApi = commentsApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<Comments_T[], string>({
      query: (args) => ({
        url: `/comments/post/${args}`,
      }),
      providesTags: ['Comments'],
    }),
    setLikeOnComment: builder.mutation<object, string>({
      query: (args) => ({
        url: `/comments/like/${args}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useGetCommentsQuery, useSetLikeOnCommentMutation } = commentsApi;
