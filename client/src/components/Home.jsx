import Footer from "./Footer"
import HomeHeader from "./HomeHeader"
import { useNavigate, Link } from "react-router-dom"
import React, { useEffect, useContext } from "react"
import DataContext from "../DataContext"

export default function Home(){

    const { event, setEvent } = useContext(DataContext)
    
    // check that user is logged in
    const navigate = useNavigate()

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn){
            navigate('/login')
        }
        setEvent(() => null)
    }, [])

    return(
        <div className='componentDiv'>
            <HomeHeader/>
            <div className='componentBody'>
                <Link className='bigButton' to='/pack_or_unpack'>Packing/Unpacking</Link>
            </div>
            <Footer/>
        </div>
    )
}