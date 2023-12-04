import Footer from "./Footer"
import HomeHeader from "./HomeHeader"
import { useNavigate, Link } from "react-router-dom"
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
        <div className='componentDiv'>
            <HomeHeader/>
            <div className='componentBody'>
                <Link className='bigButton' to='/pack_or_unpack'>Packing/Unpacking</Link>
            </div>
            <Footer/>
        </div>
    )
}