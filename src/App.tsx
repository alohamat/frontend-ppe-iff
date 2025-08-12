import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegistroPage from "./pages/RegistroPage"
import MainPage from "./pages/MainPage"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  )
}

export default App
