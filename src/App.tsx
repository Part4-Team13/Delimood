import { FC, lazy, PropsWithChildren, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading';
import { ErrorBoundary } from 'react-error-boundary';
import Error from './components/Error';

const Main = lazy(() => import('./pages/main'));
const Signup = lazy(() => import('./pages/signup'));
const Login = lazy(() => import('./pages/login'));
const GooglePage = lazy(() => import('./pages/loginSocialloading/googlePage'));
const KakaoPage = lazy(() => import('./pages/loginSocialloading/kakaoPage'));
const NaverPage = lazy(() => import('./pages/loginSocialloading/naverPage'));
const Epigrams = lazy(() => import('./pages/epigrams'));
const Search = lazy(() => import('./pages/search'));
const Addepigram = lazy(() => import('./pages/addepigram'));
const Mypage = lazy(() => import('./pages/mypage'));
const Layout = lazy(() => import('./layout/Layout'));
const EpigramBoard = lazy(() => import('./pages/epigramboard'));
const EpigramDetail = lazy(() => import('./pages/epigramdetail'));
const EditEpigram = lazy(() => import('./pages/editepigram'));

function App() {
  const SuspenseWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <SuspenseWrapper>
              <Main />
            </SuspenseWrapper>
          }
        />
        <Route
          path='signup'
          element={
            <SuspenseWrapper>
              <Signup />
            </SuspenseWrapper>
          }
        />
        <Route
          path='login'
          element={
            <SuspenseWrapper>
              <Login />
            </SuspenseWrapper>
          }
        />
        <Route
          path='epigrams'
          element={
            <SuspenseWrapper>
              <Epigrams />
            </SuspenseWrapper>
          }
        />
        <Route
          path='epigrams/:id'
          element={
            <SuspenseWrapper>
              <EpigramDetail />
            </SuspenseWrapper>
          }
        />
        <Route
          path='search'
          element={
            <SuspenseWrapper>
              <Search />
            </SuspenseWrapper>
          }
        />
        <Route
          path='addepigram'
          element={
            <SuspenseWrapper>
              <Addepigram />
            </SuspenseWrapper>
          }
        />
        <Route
          path='mypage'
          element={
            <SuspenseWrapper>
              <Mypage />
            </SuspenseWrapper>
          }
        />
        <Route
          path='board'
          element={
            <SuspenseWrapper>
              <EpigramBoard />
            </SuspenseWrapper>
          }
        />
        <Route
          path='editepigram/:id'
          element={
            <SuspenseWrapper>
              <EditEpigram />
            </SuspenseWrapper>
          }
        />
      </Route>
      <Route path='login/callback/kakao' element={<KakaoPage />} />
      <Route path='login/callback/naver' element={<NaverPage />} />
      <Route path='login/callback/google' element={<GooglePage />} />
    </Routes>
  );
}

export default App;
