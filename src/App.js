// Dependencies
import React, { useEffect, useReducer } from 'react'

// Routes
import { AppRoutes } from './routes/AppRoutes'

// Context
import { AuthContext } from './auth/authContext'

// Reducers
import { authReducer } from './auth/authReducer'

// Styles
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false }
}

export const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init)

  useEffect(() => {
    if (!user) return

    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRoutes />
    </AuthContext.Provider>
  )
}
