import { Link } from "react-router-dom"
import React, { useContext } from 'react'
import DataContext from "../DataContext"

export default function Done() {

    const { event, setEvent } = useContext(DataContext)

    function clearContext() {
        setEvent(() => null)
    }

    return (
        <Link to='/home' className='bigButton'>Done</Link>
    )
}