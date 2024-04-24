import logo from "./logo.svg";
import "./App.css";
// import LoginForm from './Components/LoginForm/LoginForm';
// import HomePage from './Components/Homepage/HomePage';
import LoginForm from "./Components/LoginForm/LoginForm";
import HomePage from "./Components/Homepage/HomePage";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import StudentsForm from "./Components/StudentsForm/StudentsForm.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
      <Route path="" element={<Dashboard />}>
        <Route path="/" element={<HomePage />} />
        <Route path="students" element={<StudentsForm />} />
      </Route>
    </Routes>
  );
}

export default App;
