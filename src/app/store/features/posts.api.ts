import { api } from '@/app/store/features/api.ts';
import { Post_T, PostQuery_T } from '@/types/models.ts';

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
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
