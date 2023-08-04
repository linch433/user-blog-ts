import './Loader.css';

const Loader = () => {
  return <div className="loader" />;
};

export default Loader;

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Loader />
    </div>
  );
};
