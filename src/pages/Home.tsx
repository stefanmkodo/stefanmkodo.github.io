import LoadingSpinner from "../components/LoadingSpinner";
import "./App.css";
import { Link } from "react-router-dom";
import {Modal} from "../components/modal/Modal";
import React, {useState} from "react";

function App() {

  const [shouldShowModal, setShouldShowModal] = useState(false)

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
      <button onClick={() => setShouldShowModal(!shouldShowModal)}>Show Modal</button>
        <Modal isOpen={shouldShowModal} closeModal={() => setShouldShowModal(!shouldShowModal)}>
            <p>Children text</p>
        </Modal>
    </div>
  );
}

export default App;
