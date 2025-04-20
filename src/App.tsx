import React from "react";
import "./App.css";
import Home from "./pages/Home/Home.tsx";
import { TrackerProvider } from "./context/TrackerContext.tsx";

function App() {
  return (
    <TrackerProvider>
      <div className="App">
        <Home />
      </div>
    </TrackerProvider>
  );
}

export default App;
