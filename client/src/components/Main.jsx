import { Route, Routes } from 'react-router-dom'
import { useContext, useState } from 'react'
import DataContext from '../DataContext'
import Login from '../Login'
import Home from './Home'
import PackOrUnpack from './PackOrUnpack'
import NewEvent from './NewEvent'
import Packing from './Packing'
import Unpacking from './Unpacking'

export default function Main() {

    const [event, setEvent] = useState(null)

    return (
        <DataContext.Provider value={{ event, setEvent }}>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/pack_or_unpack' element={<PackOrUnpack />} />
                <Route path='/new_trip' element={<NewEvent />} />
                <Route path='/packing' element={<Packing />} />
                <Route path='/unpacking' element={<Unpacking />} />
            </Routes>
        </DataContext.Provider>
    )
}