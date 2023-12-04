import Footer from "./Footer"
import HomeHeader from "./HomeHeader"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Home(){

    const navigate = useNavigate()

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn){
            navigate('/login')
        }
    }, [])

    return(
        <div className='home'>
            <HomeHeader/>
            <div className='homeBody'>
                home
            </div>
            <Footer/>
        </div>
    )
}