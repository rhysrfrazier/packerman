import React, { useContext, useEffect, useState } from "react"
import DataContext from "../DataContext"
import { useNavigate } from "react-router-dom"
import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import { BASE_URL } from "../../globals"

export default function Packing() {

    let confirmation

    // check that user is logged in
    const navigate = useNavigate()

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn) {
            navigate('/login')
        }
    }, [])

    //check that there's an event in the usecontext, if not, send back to a place where it can be added

    // get event info
    const { event, setEvent } = useContext(DataContext)
    console.log(event)

    // setting up the item_event post
    const initPackedItem = {
        unpacked_date: null,
        unpacked_by_id: null
    }

    const [packedItem, setPackedItem] = useState(initPackedItem)

    async function submit() {
        const currentDate = new Date()
        // console.log(currentDate.toString())

        setPackedItem(
            {
                ...packedItem,
                'item_id': item_id.value,
                'event_id': event.id,
                'packed_by_id': sessionStorage.getItem('user_id'),
                'packed_date': currentDate.toString()
            }
        )

        try {
            const response = await axios.post(`${BASE_URL}event_items`, packedItem)
            if (response.status === 201){
                confirmation = <div className='confirmation'>
                    {/* <response.data. fuck ok this needs to come from another axios call */}
                </div>
            }
        } catch (error) {
            console.log(error.message)
        }
        //post packedItem via axios

        //conditionally render picture/info about object if the post is successful, error message if not
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
                    <input onKeyDown={handleKeyDown} name='item_id' id='item_id' type='text' />
                </label>
                <button onClick={submit}>Submit</button>
            </div>
            <Footer />
        </div>
    )
}