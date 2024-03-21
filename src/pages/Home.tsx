import LoadingSpinner from "../components/LoadingSpinner";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="bg-white flex flex-col h-screen justify-center text-lg">
        <Link to="/results">
          <button className={"text-black hover:text-imperial"}>Results</button>
        </Link>
        <Link to="/scan">
          <button className={"color-black hover:text-imperial"}>Scan</button>
        </Link>
        <Link to="/scanning/use-mobile">
          <button className={"color-black hover:text-imperial"}>Use Mobile Screen</button>
        </Link>
      </header>
    </div>
  );
}

export default App;
