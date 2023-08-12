import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { clsx } from 'clsx';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div
      className={clsx(
        'min-h-screen flex flex-col',
        'items-center justify-center',
        'gap-10',
      )}
    >
      <h1 className={'text-6xl font-bold'}>Oopps!</h1>
      <p className={'text-3xl text-center'}>
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i className={'text-xl'}>
          {isRouteErrorResponse(error)
            ? error.error?.message || error.statusText
            : 'Unknown error message'}
        </i>
      </p>
    </div>
  );
};

export default ErrorPage;
