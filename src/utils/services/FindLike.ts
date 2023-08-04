export const findLikeOnPost = (likes: string[], userId: string | undefined) =>
  likes?.find((id: string) => {
    if (id === userId) {
      return id;
    }
    return undefined;
  });
