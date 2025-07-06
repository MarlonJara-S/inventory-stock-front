import { QueryProvider } from './app/shared/providers/QueryProvider';
import { ThemeProvider } from './components';
import { AppRouter } from './router';

function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;