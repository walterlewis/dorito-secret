import { useState } from 'react'
import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {TextField} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {

  const [password, setPassword] = useState<string>('');
  const [successfulPassword, setSuccessfulPassword] = useState<boolean>(false);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if(formData.get('password') == 'text') {
      setSuccessfulPassword(true);
    }
  }

  const loginDisplay = () => {
    return (
        <div style={{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <form onSubmit={handleSubmit} style={{
          display:'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10
        }}>
            <label htmlFor="password">Password:</label>
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        {!successfulPassword && loginDisplay()}
        {successfulPassword && <div>test</div>}
      </ThemeProvider>
    </>
  )
}

export default App
