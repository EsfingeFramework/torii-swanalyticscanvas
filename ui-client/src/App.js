import { BrowserRouter, Routes, Route } from "react-router-dom";
import Views from "./Views";
import NavbarComp from "./components/NavbarComp";

function App() {
  return (
    <BrowserRouter>
      <NavbarComp />
      <Views />
    </BrowserRouter>
  );
}

export default App;
