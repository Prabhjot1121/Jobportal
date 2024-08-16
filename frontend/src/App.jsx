import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  }, {
    path: "/signup",
    element: <SignUp />
  },
])


function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      
    </>
  )
}

export default App
