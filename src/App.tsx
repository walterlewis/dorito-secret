import { useState } from 'react'
import './App.css'
import {TextField, Button} from '@mui/material';
import MainPage from './MainPage';
import '@fontsource/averia-serif-libre/300.css';
import '@fontsource/averia-serif-libre/400.css';
import '@fontsource/averia-serif-libre/700.css';

function App() {

  /*
  add:
    -weather functionality with location
    -puppy picture api grabber, useEffect probably
    -footer with timmy and tommy and message
  */

  const [password, setPassword] = useState<string>('');
  const [successfulPassword, setSuccessfulPassword] = useState<boolean>(false);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if(formData.get('password') == 'copperleocharlie') {
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
          <img src="beaver.png" width="200px" height="200px" alt="beaver"/>
            <label htmlFor="password">Enter the Password!</label>
          <TextField
            id="password"
            name="password"
            type="password"
            label="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">Submit!</Button>
        </form>
      </div>
    )
  }

  return (
    <div style={{backgroundColor: '#b7e0b4'}}>
        {!successfulPassword && loginDisplay()}
        {successfulPassword && <MainPage/>}
    </div>
  )
}

export default App
