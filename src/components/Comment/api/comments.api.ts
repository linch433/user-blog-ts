import { api } from '@/app/store/features/api.ts';
import { IComments } from '@/components/Comment/types/comments.ts';
import { IQueriesArgs } from '@/types/queries.ts';

const commentsApiWithTags = api.enhanceEndpoints({ addTagTypes: ['Comments'] });

export const commentsApi = commentsApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<IComments[], string>({
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
    }),
    createNewComment: builder.mutation<
      Omit<IComments, 'followedCommentList'>,
      IQueriesArgs
    >({
      query: ({ args, body }) => ({
        url: `/comments/post/${args}`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Comments'],
    }),
    updateUserComment: builder.mutation<
      Omit<IComments, 'followedCommentList'>,
      IQueriesArgs
    >({
      query: ({ args, body }) => ({
        url: `/comments/${args}`,
        method: 'PATCH',
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
  useUpdateUserCommentMutation,
} = commentsApi;
