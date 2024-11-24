import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./admin";
import Form from "./form";
import Home from "./home";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
