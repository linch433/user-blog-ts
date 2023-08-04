interface IPostText {
  title: string;
  text: string | undefined;
}

const PostText = ({ title, text }: IPostText) => {
  if (text)
    return (
      <p>
        <span className="font-bold">{title}:</span> {text}
      </p>
    );
};

export default PostText;
