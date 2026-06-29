import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {

  const user =
    localStorage.getItem("user");

  return user
    ? children
    : <Navigate to="/login" replace />;

}

function App() {

  return (

    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>
        }
      />

    </Routes>

  );

}

export default App;import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {

  const user =
    localStorage.getItem("user");

  return user
    ? children
    : <Navigate to="/login" replace />;

}

function App() {

  return (

    <Routes>

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>
        }
      />

    </Routes>

  );

}

export default App;