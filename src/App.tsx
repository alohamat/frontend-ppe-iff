import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegistroPage from "./pages/RegistroPage"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
    </Routes>
  )
}

export default App
