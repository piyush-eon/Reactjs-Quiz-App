import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
