import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthProvider from './utils/AuthProvider'
import { ProtectedRoute } from './utils/ProtectedRoute'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import './App.css'

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
