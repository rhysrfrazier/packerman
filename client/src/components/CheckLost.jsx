import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import Message from "./Message"
import Done from "./Done"
import LostItems from "./LostItems"
import DoneOrUnpackAgain from "./DoneOrUnpackAgain"
import React, { useContext, useEffect, useState } from "react"
import DataContext from "../DataContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../../globals"

export default function CheckLost() {

    const [confirmation, setConfirmation] = useState(null)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const { event, setEvent } = useContext(DataContext)

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn) {
            navigate('/login')
        } else if (event === null) {
            navigate('/pack_or_unpack')
        } //this statement will be removed in the future when this component gets reused for user_items check in

        checkLost()
    }, [])

    async function checkLost() {
        if (event) {
            const eventItems = (await axios.get(`${BASE_URL}event_items/`)).data
            //this gets an array of all everything in event_items where the event matches the current event AND unpacked_date is null:
            const unpackedNull = eventItems.filter((item) => item.event_id === event && !item.unpacked_date)

            if (unpackedNull.length === 0) {
                setMessage('Everything is unpacked. Welcome home!')
                setConfirmation(
                    <div className='dynamicDiv'>
                        <Message message={message} />
                        <Done />
                    </div>)
            } else {
                const results = []
                for (const row of unpackedNull) {
                    results.push(axios.get(`${BASE_URL}/items/${row.item_id}`))
                }
                const packedItems = ((await Promise.all(results)).map((item) => item.data))
                console.log(packedItems)

                setConfirmation(() =>
                    <div className='dynamicDiv'>
                        <Message message={"Was that everything? These things still haven't been unpacked:"} />
                        {packedItems.map((item) =>
                            <LostItems item={item} key={item.id} recheckLost={checkLost} />
                        )}
                        <DoneOrUnpackAgain />
                    </div>
                )
            }
        }
        //in the future, if there's no event this will check for any items still checked out in the user_items table
    }

    return (
        <div className='componentDiv'>
            <PackUnpackHeader />
            <div className='componentBody'>
                {confirmation}
            </div>
            <Footer />
        </div>
    )
}