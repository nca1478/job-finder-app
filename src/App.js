import React, { useEffect, useReducer } from 'react'
import { AppRoutes } from './routes/AppRoutes'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from './components/auth/authContext'
import { authReducer } from './components/auth/authReducer'

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
