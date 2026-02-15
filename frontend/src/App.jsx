import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/home.jsx";
import ContextProvider from "./context/contextprovider.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
