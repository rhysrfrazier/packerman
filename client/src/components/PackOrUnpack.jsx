import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function PackOrUnpack() {

    // check that user is logged in
    const navigate = useNavigate()
    
    useEffect(() => {
        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn){
            navigate('/login')
        }
    }, [])

    return (
        <div className='componentDiv'>
            <PackUnpackHeader />
            <div className='componentBody'>
                <Link to='/new_trip' className='bigButton'>Pack for a New Trip</Link>
            </div>
            <Footer />
        </div>
    )
}