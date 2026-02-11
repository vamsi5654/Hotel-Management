import logo from "./logo.svg";
import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer.jsx";   // <-- FIXED

function App() {
  return (
    <div className="App">
      <Header />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit src/App.js and save to reload.</p>
      </header>

      <Footer />
    </div>
  );
}

export default App;
