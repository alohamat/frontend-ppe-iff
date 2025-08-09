import { Routes, Route } from "react-router-dom"
import RootPage from "./pages/RootPage"

function App() {
  return (
    <Routes>
      <Route path="" element={<RootPage />} />
    </Routes>
  )
}

export default App
