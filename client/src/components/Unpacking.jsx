import Footer from "./Footer"
import PackUnpackHeader from "./PackUnpackHeader"
import React, { useContext, useEffect, useState } from "react"
import DataContext from "../DataContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../globals"
import { DateTime } from "luxon"
import Error from "./Error"
import ItemScannedIn from "./ItemScannedIn"

export default function Unpacking() {

    const [confirmation, setConfirmation] = useState()

    // check that user is logged in and there's an event in useContext
    const navigate = useNavigate()

    const { event, setEvent } = useContext(DataContext)

    useEffect(() => {

        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn) {
            navigate('/login')
        }
        else if (event === null) {
            navigate('/pack_or_unpack')
        }
    }, [])

    //then get everything for the put and make the put call

    const [unpackedId, setUnpackedId] = useState(null)

    function handleChange(e) {
        setUnpackedId(e.target.value)
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            submit()
        }
    }

    function check(eventId, itemId){
        return eventId === event && itemId === unpackedId
    }

    async function submit(){

        const currentDate = DateTime.now()

        const allEventItems = (await axios.get(`${BASE_URL}event_items/`)).data
        const currentRow = allEventItems.find((item) => check(item.event_id, item.item_id))
        currentRow.unpacked_date = currentDate.toISODate()
        currentRow.unpacked_by_id = sessionStorage.getItem('user_id')
        try {
            const response = await axios.put(`${BASE_URL}event_items/${currentRow.id}`, currentRow)
            if (response.status === 200){
                const item = (await axios.get(`${BASE_URL}items/${currentRow.item_id}`)).data
                setConfirmation(<ItemScannedIn item={item}/>)
            }
        } catch (error) {
            const message = error.message
            setConfirmation(<Error message={message}/>)
        }

    }

    //then conditionally generate confirmation

    return (
        <div className='componentDiv'>
            <PackUnpackHeader />
            <div className='componentBody'>
                <label htmlFor='item_id' className='sr-only'>
                    UUID input
                    <br />
                    <input onKeyDown={handleKeyDown} name='item_id' id='item_id' type='text' onChange={handleChange} />
                </label>
                <button className='medButton' onClick={submit}>Submit</button>
                {confirmation}
            </div>
            <Footer />
        </div>
    )
}