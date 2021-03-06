import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from "./pages/Login"
import Home from './pages/Home';
import Register from './pages/Register';
import Nav from './components/Nav';
import Forgot from './pages/Forgot';
import Reset from './pages/Reset';
import Documentation from './pages/Documentation.tsx';
import ShareNote from './pages/ShareNote';

function App() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if(user == null) {
      (
        async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/user');
            let user = response.data;
            setUser(user);
          } catch (e) {
            setUser(null);
          }
  
        }
      )();
    } 
    else if (login == false){(
      async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/user');
          let user = response.data;
          setUser(user);
        } catch (e) {
          setUser(null);
        }
      })();
    }
    
  });

  return (
      <BrowserRouter>
        <Nav user={user} setLogin={() => setLogin(false)}/>
        <Route path="/" exact component={() => <Home user={user}/>} />
        <Route path="/doc" component={Documentation} />
        <Route path="/share" render={(props) => <ShareNote {...props}/>}/>
        {!login && (
          <div style={{ verticalAlign: "center", paddingLeft: "600px", paddingTop: "200px" }}>
              <Route path="/login" component={() => <Login setLogin={() => setLogin(true)}/>} />
              <Route path="/register" component={() => <Register setLogin={() => setLogin(false)} />} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/reset/:token" component={Reset} />
            </div>
        )}
      </BrowserRouter>
      
  );
}

export default App;
