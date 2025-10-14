import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import RestaurantePage from "./pages/RestaurantePage";

import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";
import RestauranteRoute from "./routes/RestauranteRoute";

import { AuthProvider } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="*" element={<Navigate to="/main" replace />}/>
        <Route element={<PublicRoute />}>
          <Route path="/registro" element={<RegistroPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainPage />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route element={<RestauranteRoute />}>
          <Route path="/restaurante" element={<RestaurantePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
