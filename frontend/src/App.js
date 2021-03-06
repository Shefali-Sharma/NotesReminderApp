import './App.css';

function App() {
  return (
    <body class="text-center">
      <main class="form-signin">
        <div className="App">
          <form>

            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <input type="email" class="form-control" placeholder="Email" required autofocus />

            <input type="password" class="form-control" placeholder="Password" required />

            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

          </form>
        </div>
      </main>
    </body>
  );
}

export default App;
