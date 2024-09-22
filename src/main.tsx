import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FuelProvider } from "@fuels/react";
import { defaultConnectors } from "@fuels/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import App from './App';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <FuelProvider
        fuelConfig={{
          connectors: defaultConnectors(),
        }}
      >
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </StrictMode>
);
