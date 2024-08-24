import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Layout() {
  return (
    <>
      <Header />
      <div className='overflow-hidden mt-[52px] tablet:mt-[60px] desktop:mt-[80px]'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
