import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LoadingProvider } from './context/LoadingContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <LoadingProvider>
          <AppRoutes />
        </LoadingProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
