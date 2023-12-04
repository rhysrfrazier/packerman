import { Link } from "react-router-dom"
import Login from "../Login"

export default function Footer() {

    function logout() {
        sessionStorage.clear()
        console.log('storage cleared')
    }

    return (
        <div className='footer'>
            <Link className='logout' to='/login' onClick={logout}>Logout</Link>
        </div>
    )
}