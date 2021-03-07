import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from "./pages/Login"
import Home from './pages/Home';
import Register from './pages/Register';
import Nav from './components/Nav';
import Forgot from './pages/Forgot';

function App() {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/user');
          const user = response.data;
          setUser(user);
        } catch (e) {
          setUser(null);
        }

      }
    )();
  });

  return (
    
      <BrowserRouter>
        <div>
          <Nav user={user} setLogin={() => setLogin(false)}/>
        </div>
        <abc className="text-center">
          <main className="form-signin">
            <div className="App">
              <Route path="/" exact component={() => <Home user={user} />} />
              <Route path="/login" component={() => <Login setLogin={() => setLogin(true)}/>} />
              <Route path="/register" component={Register} />
              <Route path="/forgot" component={Forgot} />
            </div>
          </main>
        </abc>
      </BrowserRouter>
    
  );
}

export default App;
