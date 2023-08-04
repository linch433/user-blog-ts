import { api } from '@/app/store/features/api.ts';
import { Comments_T } from '@/types/models.ts';
import { NewCommentArgs_T } from '@/types/queries.ts';

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
    createNewComment: builder.mutation<
      Omit<Comments_T, 'followedCommentList'>,
      NewCommentArgs_T
    >({
      query: ({ args, body }) => ({
        url: `/comments/post/${args}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useSetLikeOnCommentMutation,
  useCreateNewCommentMutation,
} = commentsApi;
