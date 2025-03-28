import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './Pages/Auth/login'
import SignUp from './Pages/Auth/SignUp'
import Home from './Pages/Dashboard/Home'
import Income from './Pages/Dashboard/Income'
import Expense from './Pages/Dashboard/Expense'
import UserProvider from './Context/useContext'

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App

const Root = () => {
  // check whether token exists
  const isAuthenticated = !!localStorage.getItem("token")

  // check whether the user is authenticated or else redirect to login
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
}