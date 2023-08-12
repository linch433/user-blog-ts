import { IUser } from '@/types/models.ts';

export const findLikeOnPostOrComment = (
  likes: string[],
  userInfo: IUser | undefined,
) =>
  likes?.find((id: string) => {
    if (id === userInfo?._id) {
      return id;
    }
    return undefined;
  });
