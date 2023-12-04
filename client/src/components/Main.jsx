import { Route, Routes } from 'react-router-dom'
import Login from '../Login'
import Home from './Home'
import PackOrUnpack from './PackOrUnpack'
import NewEvent from './NewEvent'
import Packing from './Packing'

export default function Main(){

    return(
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/pack_or_unpack' element={<PackOrUnpack/>} />
            <Route path='/new_trip' element={<NewEvent/>} />
            <Route path='/packing' element={<Packing/>} />
        </Routes>
    )
}