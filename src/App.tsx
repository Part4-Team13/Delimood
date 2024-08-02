import Signup from './pages/signup';
import Login from './pages/login';
import { MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
