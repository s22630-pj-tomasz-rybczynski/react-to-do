import { Routes, Route } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Whoops404 from "./pages/whoops";
import Home from "./pages/home";
import { ReactSession } from 'react-client-session';

function App() {
  ReactSession.setStoreType("localStorage");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

export default App;
