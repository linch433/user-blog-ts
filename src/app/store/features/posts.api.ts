import { api } from '@/app/store/features/api.ts';
import { Post_T, PostQuery_T } from '@/types/models.ts';
import { EditPostArgs_T, UploadImageArgs_T } from '@/types/queries.ts';

const postsApiWithTag = api.enhanceEndpoints({ addTagTypes: ['Posts'] });

export const postsApi = postsApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post_T[], PostQuery_T>({
      query: (args) => ({
        url: `/posts`,
        params: { ...args },
      }),
      transformResponse: (rawResult: { data: Post_T[] }) => {
        return rawResult.data;
      },
      providesTags: ['Posts'],
    }),
    getPostById: builder.query<Post_T, string>({
      query: (args) => ({
        url: `/posts/${args}`,
      }),
      providesTags: ['Posts'],
    }),
    updatePostWithId: builder.mutation<Post_T, EditPostArgs_T>({
      query: ({ args, body }) => ({
        url: `/posts/${args}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePostImageWithId: builder.mutation<Post_T, UploadImageArgs_T>({
      query: ({ args, fileData }) => ({
        url: `/posts/upload/${args}`,
        method: 'PUT',
        body: fileData,
      }),
      invalidatesTags: ['Posts'],
    }),
    setLikeForPostById: builder.mutation({
      query: (postId) => ({
        url: `/posts/like/${postId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useSetLikeForPostByIdMutation,
  useGetPostByIdQuery,
  useUpdatePostWithIdMutation,
  useUpdatePostImageWithIdMutation,
} = postsApi;
