import { render } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders application smoke test without crashing', () => {
  const { container } = render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  expect(container).toBeInTheDocument();
});
