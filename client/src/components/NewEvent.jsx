import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import React, { useState, useContext, useEffect } from "react"
import DataContext from "../DataContext"
import axios from "axios"
import { BASE_URL } from "../../globals"
import { Link, useNavigate } from "react-router-dom"

export default function NewEvent() {

    // check that user is logged in
    const navigate = useNavigate()

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('user_id')
        if (!loggedIn) {
            navigate('/login')
        }
    }, [])

    //stuff for making a new event and carrying the json over
    const [formState, setFormState] = useState({})
    const { event, setEvent } = useContext(DataContext)

    function handleChange(event) {
        setFormState({ ...formState, [event.target.name]: event.target.value })
    }

    async function createNew(e) {
        e.preventDefault()
        try {
            const response = await axios.post(`${BASE_URL}events/`, formState)
            if (response.status === 201) {
                setEvent(() => response.data.id)
                goToPacking()
            } else {
                navigate('/new_trip')
            }
        } catch (error) {
            navigate('/new_trip')
        }
    }

    function goToPacking() {
        navigate('/packing')
    }

    return (
        <div className='componentDiv'>
            <PackUnpackHeader />
            <div className='componentBody'>
                <form onSubmit={createNew}>
                    <div className='formSection'>
                        <label>
                            Event Name:
                            <br />
                            <input type='text' name='name' onChange={handleChange} />
                        </label>
                    </div>
                    <div className='formSection'>
                        <label>
                            Start Date:
                            <br />
                            <input type='date' name='start_date' onChange={handleChange} />
                        </label>
                    </div>
                    <div className='formSection'>
                        <label>
                            End Date:
                            <br />
                            <input type='date' name='end_date' onChange={handleChange} />
                        </label>
                    </div>
                    <div className='formSection'>
                        <label>
                            Event Type:
                            <br />
                            <input type='text' name='event_type' onChange={handleChange} />
                        </label>
                    </div>
                    <button className='medButton' onClick={createNew}>Create Event</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}