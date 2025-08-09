import { Routes, Route } from "react-router-dom"
import RootPage from "./pages/LoginPage"

function App() {
  return (
    <Routes>
      <Route path="" element={<RootPage />} />
    </Routes>
  )
}

export default App
