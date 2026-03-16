import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Incidents from "./pages/Incidents";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/incidents" element={<Incidents />} />
      </Routes>
    </>
  );
}

export default App;
