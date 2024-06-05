import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './pages/Home/Home'
import { SignUp } from './pages/SignUp/SignUp'
import { Login } from './pages/Login/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path="/" exact element={<Login/>} > </Route>
      <Route path="/signup" exact  element={<SignUp/>}> </Route>
      <Route path="/dashboard" exact  element={<Home/>}> </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
