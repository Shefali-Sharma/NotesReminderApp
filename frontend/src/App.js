import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Login from "./pages/Login"
import Home from './pages/Home';
import Register from './pages/Register';
import Nav from './components/Nav';

function App() {
  return (
    <body>
      <BrowserRouter>
        <div>
          <Nav />
        </div>
        <abc class="text-center">

          <main class="form-signin">
            <div className="App">

              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

            </div>
          </main>


        </abc>
      </BrowserRouter>
    </body>
  );
}

export default App;
