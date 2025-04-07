import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import RequiredAuth from '../utils/RequiredAuth'
import routeConfig from './routeConfig'
import { ToastContainer } from 'react-toastify'

const AppRouter = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            {
                routeConfig.public.map(({path,element},index)=>(
                    <Route path={path} element={element} key={index}/>
                ))
            }
            {
                routeConfig.private.map(({path,element},index)=>(
                    <Route path={path} element={<RequiredAuth>{element}</RequiredAuth>} key={index}/>
                ))
            }
        </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  )
}

export default AppRouter