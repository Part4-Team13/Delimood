import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import './index.css';
import '../global.css';
import alertMessage from './utils/alertMessage.tsx';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => alertMessage({ title: 'Error', message: e.message, color: 'red' }),
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider>
          <App />
          <Notifications />
        </MantineProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
);
