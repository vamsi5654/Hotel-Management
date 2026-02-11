import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer.jsx";   // <-- FIXED
import Home from "./Pages/Home.jsx";
function App() {
  return (
    <div className="App">
      <Header />
      <Home />

      <Footer />
    </div>
  );
}

export default App;
