import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { BASE_URL } from "../../globals"
import DataContext from "../DataContext"

export default function PackOrUnpack() {

    const navigate = useNavigate()

    const [dynamicDiv, setDynamicDiv] = useState(null)
    const { event, setEvent } = useContext(DataContext)

    //need a click handler that first changes context, then navigates to the packing page. These will go on the buttons that we generate via array mapping for preexisting trips so we can set context
    function goToPacking() {
        navigate('/packing')
    }

    function goToUnpacking() {
        navigate('/unpacking')
    }

    function clickHandler(id) {
        setEvent(() => id)
        goToPacking()
    }

    function clickUnpack(id) {
        setEvent(() => id)
        goToUnpacking()
    }

    async function getCurrentTrips() {
        //getting the event_items rows from back end
        const allEventItems = (await axios.get(`${BASE_URL}event_items/`)).data
        console.log('getting all event_items:', allEventItems)
        //of those, getting only the rows that haven't been unpacked yet
        const activeEventItems = allEventItems.filter((eventItems) => eventItems.unpacked_date === null)
        console.log('getting only active event_items', activeEventItems)
        //getting an array of all event ids that haven't been unpacked
        const eventIds = new Set()
        for (const obj of activeEventItems.values()) {
            eventIds.add(obj.event_id)
        }
        const eventIdsArr = Array.from(eventIds)
        //because axios calls act strange with loops, line them up and get them to resolve all at once
        const results = []
        for (const id of eventIdsArr) {
            results.push(axios.get(`${BASE_URL}events/${id}`))
        }
        const currentTrips = (await Promise.all(results)).map((obj) => obj.data)
        //if there aren't current trips, go to the page where you make new ones
        if (currentTrips.length === 0) {
            setDynamicDiv(<div className='dynamicDiv'>
                <div className='subDynaDiv'>
                    <Link to='/new_trip' className='bigButton'>Pack for a New Trip</Link>
                </div>
            </div>)
            // if there's one or more current trip, map over the array and generate the following buttons
        } else {
            setDynamicDiv(<div className='dynamicDiv'>
                {currentTrips.map((event) => {
                    return (<div className='subDynaDiv'>
                        <button className='bigButton' onClick={() => clickHandler(event.id)} key={'continue' + event.id}>Continue packing for {event.name}</button>
                        <button className='bigButton' onClick={() => clickUnpack(event.id)} key={'unpack' + event.id.toString}>Unpack from {event.name}</button>
                    </div>)
                })}
            </div>)
        }
    }

    useEffect(() => {
        // check that user is logged in and see if there are any trips that haven't been unpacked (currentTrips)
        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn) {
            navigate('/login')
        }

        getCurrentTrips()

    }, [])

    return (
        <div className='componentDiv'>
            <PackUnpackHeader />
            <div className='componentBody'>
                {dynamicDiv}
            </div>
            <Footer />
        </div>
    )
}