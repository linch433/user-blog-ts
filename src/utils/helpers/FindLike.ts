import { IUser } from '@/types/models.ts';

export const findLikeOnPostOrComment = (
  likes: string[],
  userInfo: IUser | undefined,
) =>
  likes?.some((id: string) => {
    return id === userInfo?._id;
  });
