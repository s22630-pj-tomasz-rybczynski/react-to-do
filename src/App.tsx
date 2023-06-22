import { Routes, Route } from "react-router-dom";
import Register from './pages/register';
import Login from './pages/login';
import Whoops404 from "./pages/whoops";
import Home from "./pages/home";
import { ReactSession } from 'react-client-session';
import { TasksProvider } from "./context/TaskContext";

function App() {
  ReactSession.setStoreType("localStorage");

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <TasksProvider>
            <Home />
          </TasksProvider>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

export default App;
