import { api } from '@/app/store/features/api.ts';
import { IPost, IPostQuery } from '@/types/models.ts';
import { IEditPostArgs, INewPost, IUploadImageArgs } from '@/types/queries.ts';

const postsApiWithTag = api.enhanceEndpoints({ addTagTypes: ['Posts'] });

export const postsApi = postsApiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], IPostQuery>({
      query: (args) => ({
        url: `/posts`,
        params: { ...args },
      }),
      transformResponse: (rawResult: { data: IPost[] }) => {
        return rawResult.data;
      },
      providesTags: ['Posts'],
    }),
    getPostById: builder.query<IPost, string>({
      query: (args) => ({
        url: `/posts/${args}`,
      }),
      providesTags: ['Posts'],
    }),
    createPost: builder.mutation<IPost, INewPost>({
      query: (body) => ({
        url: `/posts`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePostWithId: builder.mutation<IPost, IEditPostArgs>({
      query: ({ args, body }) => ({
        url: `/posts/${args}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePostImageWithId: builder.mutation<IPost, IUploadImageArgs>({
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
  useCreatePostMutation,
  useSetLikeForPostByIdMutation,
  useGetPostByIdQuery,
  useUpdatePostWithIdMutation,
  useUpdatePostImageWithIdMutation,
} = postsApi;
