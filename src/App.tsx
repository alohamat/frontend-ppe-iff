import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import MainPage from "./pages/MainPage";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<Navigate to="/main" replace />}/>
        <Route element={<PublicRoute />}>
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
