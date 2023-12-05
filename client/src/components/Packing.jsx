import React, { useContext, useEffect, useState } from "react"
import DataContext from "../DataContext"
import { useNavigate } from "react-router-dom"
import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import { BASE_URL } from "../../globals"
import axios from "axios"
import { DateTime } from 'luxon'


export default function Packing() {

    //we'll come back to this to conditionally render certain components?
    let confirmation

    // check that user is logged in and there's an event in useContext
    const navigate = useNavigate()

    //this seems to be breaking something - maybe Context isn't getting set quickly enough for me to get to this page? It just does it the first time I think
    const { event, setEvent } = useContext(DataContext)

    useEffect(() => {
        
        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn) {
            navigate('/login')
        } else if (!event) {
            navigate('/pack_or_unpack')
        }

    }, [])

    // setting up the item_event post
    const initPackedItem = {
        unpacked_date: null,
        unpacked_by_id: null,
    }

    const [packedItemId, setPackedItemId] = useState(null)

    function handleChange(event){
        console.log(event.target.value)
        setPackedItemId(event.target.value)
    }

    async function submit() {
        const currentDate = DateTime.now()

        //id if this actually has to be like this or if the whole thing could have gone in state, but I tried this as part of debugging and it works now so it's staying. Maybe it doesn't need to be in order, idk, but I do not have time to verify that right now.
        const postRow = {
            item_id: packedItemId,
            event_id: event.id.toString(),
            packed_date: currentDate.toISODate(),
            unpacked_date: initPackedItem.unpacked_date,
            packed_by_id: sessionStorage.getItem('user_id'),
            unpacked_by_id: initPackedItem.unpacked_by_id
        }

        try {
            const response = await axios.post(`${BASE_URL}event_items/`, postRow)

            //if the first one works, make a second one for the object
            if (response.status === 201) {
                console.log('success')
                const item = (await axios.get(`${BASE_URL}items/${postRow.item_id}`)).data

                // confirmation = <div className='confirmation'>
                //     {/* <response.data. fuck ok this needs to come from another axios call */}
                // </div>
            }
        } catch (error) {
            console.log(error.message)
            //also want an error component
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            submit()
        }
    }

    return (
        <div className='componentDiv'>
            <PackUnpackHeader />
            <div className='componentBody'>
                <label htmlFor='item_id' className='sr-only'>
                    UUID input
                    <br />
                    <input onKeyDown={handleKeyDown} name='item_id' id='item_id' type='text' onChange={handleChange}/>
                </label>
                <button onClick={submit}>Submit</button>
            </div>
            <Footer />
        </div>
    )
}