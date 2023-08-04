import { clsx } from 'clsx';
import { hasMoreThanTwoWords } from '@/utils/services/StringService.ts';

interface IPostText {
  title: string;
  text: string | number | undefined;
}

const PostText = ({ title, text }: IPostText) => {
  if (text) {
    const isTextHasMoreThanTwoWords = !hasMoreThanTwoWords(text as string);
    return (
      <p className={clsx(isTextHasMoreThanTwoWords && 'truncate')}>
        <span className="font-bold">{title}:</span> {text}
      </p>
    );
  }
};

export default PostText;
