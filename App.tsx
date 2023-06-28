import { AccountProvider } from './src/contexts/AccountFormContext';
import { Routes } from './src/routes';

export default function App() {
  return (
    <AccountProvider>
      <Routes />
    </AccountProvider>
  );
}
