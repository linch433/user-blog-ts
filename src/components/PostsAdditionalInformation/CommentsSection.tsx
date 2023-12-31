import { PageLoader } from '@/components/ui/Loader/Loader.tsx';
import Comment from '@/components/Comment/ui/Comment.tsx';
import { IComments } from '@/components/Comment/types/comments.ts';

interface ICommentsSection {
  isLoadingComments: boolean;
  commentsArray: IComments[];
}

const CommentsSection = ({
  isLoadingComments,
  commentsArray,
}: ICommentsSection) => {
  return (
    <div>
      <div className="mb-4">Comments section:</div>
      {isLoadingComments ? (
        <PageLoader />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {commentsArray?.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
