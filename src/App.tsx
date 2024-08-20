import { Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Signup from './pages/signup';
import Login from './pages/login';
import Epigrams from './pages/epigrams';
import Search from './pages/search';
import Addepigram from './pages/addepigram';
import Mypage from './pages/mypage';
import Layout from './layout/Layout';
import EpigramDetail from './pages/epigramDetail';
import EditEpigram from './pages/editepigram';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='epigrams' element={<Epigrams />} />
        <Route path='epigrams/:id' element={<EpigramDetail />} />
        <Route path='search' element={<Search />} />
        <Route path='addepigram' element={<Addepigram />} />
        <Route path='mypage' element={<Mypage />} />
        <Route path='editepigram/:id' element={<EditEpigram />} />
      </Route>
    </Routes>
  );
}

export default App;
