import { User_T } from '@/types/models.ts';

export const findLikeOnPostOrComment = (
  likes: string[],
  userInfo: User_T | undefined,
) =>
  likes?.find((id: string) => {
    if (id === userInfo?._id) {
      return id;
    }
    return undefined;
  });
