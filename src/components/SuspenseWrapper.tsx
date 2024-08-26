import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './ErrorComponent';
import { Loader } from '@mantine/core';

function SuspenseWrapper({ children, color = 'blue' }: { children: ReactNode; color?: string }) {
  const Loading = ({ color }: { color: string }) => {
    return (
      <div className='text-center my-[20px]'>
        <Loader color={color} />
      </div>
    );
  };
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <Suspense fallback={<Loading color={color} />}>{children}</Suspense>
    </ErrorBoundary>
  );
}
export default SuspenseWrapper;
