import { Route, Routes } from 'react-router-dom'
import Login from '../Login'
import Home from './Home'

export default function Main(){

    return(
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
        </Routes>
    )
}