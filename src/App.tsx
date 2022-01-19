import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import Switcher from 'components/Switcher';
import { AppContextProvider } from 'hooks/AppContext';
import ptBrLocale from 'date-fns/locale/pt-BR';
import theme from './theme';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocale}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>
          <Switcher />
        </AppContextProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
