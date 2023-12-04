import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import { Link } from "react-router-dom"

export default function PackOrUnpack() {
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