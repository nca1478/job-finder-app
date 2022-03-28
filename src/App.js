// Dependencies
import React, { useEffect, useReducer } from 'react'
import { AppRoutes } from './routes/AppRoutes'
import { AuthContext } from './auth/authContext'
import { authReducer } from './auth/authReducer'

// Styles
import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const init = () => {
  return JSON.parse(sessionStorage.getItem('user')) || { logged: false }
}

export const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init)

  // Delete localStorage when close browser
  // window.onunload = () => {
  //   localStorage.clear()
  // }

  useEffect(() => {
    if (!user) return

    sessionStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRoutes />
    </AuthContext.Provider>
  )
}
