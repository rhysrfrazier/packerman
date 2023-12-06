import { Link } from "react-router-dom"

export default function DoneOrUnpackAgain(){

    return(
        <div className='doneOrUnpack'>
            <Link to='/home' className='halfButton'>Done for Now</Link>
            <Link to='/unpacking' className='halfButton'>Continue Unpacking</Link>
        </div>
    )
}