import { Link } from "react-router-dom"
import Login from "../Login"

export default function Footer() {

    function logout() {
        sessionStorage.clear()
        console.log('logged out')
    }

    return (
        <div className='footer'>
            <Link className='logout' to='/login' onClick={logout}>Log Out</Link>
        </div>
    )
}