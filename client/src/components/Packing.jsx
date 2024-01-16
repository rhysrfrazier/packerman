import React, { useContext, useEffect, useState } from "react"
import DataContext from "../DataContext"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../globals"
import axios from "axios"
import { DateTime } from 'luxon'
import ItemScannedOut from "./ItemScannedOut"
import Message from "./Message"
import Footer from "./Footer"
import PackUnpackHeader from "./PackUnpackHeader"


export default function Packing() {

    //we'll come back to this to conditionally render certain components?
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

    // setting up the item_event post
    const initPackedItem = {
        unpacked_date: null,
        unpacked_by_id: null,
    }

    const [packedItemId, setPackedItemId] = useState(null)

    function handleChange(event) {
        setPackedItemId(event.target.value)
    }

    async function submit() {
        const currentDate = DateTime.now()

        const postRow = {
            item_id: packedItemId,
            event_id: event.toString(),
            packed_date: currentDate.toISODate(),
            unpacked_date: initPackedItem.unpacked_date,
            packed_by_id: sessionStorage.getItem('user_id'),
            unpacked_by_id: initPackedItem.unpacked_by_id
        }

        try {
            const response = await axios.post(`${BASE_URL}event_items/`, postRow)

            //if the first call works, make a second one for the object
            if (response.status === 201) {

                console.log('success')

                const item = (await axios.get(`${BASE_URL}items/${postRow.item_id}`)).data

                setConfirmation(<ItemScannedOut item={item} />)


            }
        } catch (error) {
            const message = error.message
            setConfirmation(<Message message={message} />)
        } finally {
            const input = document.querySelector('input')
            input.select()
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
                <label htmlFor='item_id'
                    className='sr-only'
                >
                    UUID input
                    <br />
                    <input
                        onKeyDown={handleKeyDown}
                        name='item_id'
                        id='item_id'
                        type='text'
                        onChange={handleChange}
                        className='packingInput'
                        autoFocus
                        />
                </label>
                <button className='medButton' onClick={submit}>Submit</button>
                {confirmation}
            </div>
            <Footer />
        </div>
    )
}