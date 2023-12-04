import Footer from "./Footer"
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
            <p>home</p>
            <Footer/>
        </div>
    )
}