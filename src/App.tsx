import Signup from './pages/signup';
import { MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';
//import Login from './pages/login';

function App() {
  return (
    <MantineProvider>
      <Routes>
        <Route path='signup' element={<Signup />} />
      </Routes>
    </MantineProvider>
  );
}

export default App;
