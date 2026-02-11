
import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer.jsx";   // <-- FIXED
import Home from "./Pages/Home";
function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
