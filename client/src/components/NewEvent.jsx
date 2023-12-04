import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../globals"

export default function NewEvent() {

    const [formState, setFormState] = useState({})

    function handleChange(event) {
        setFormState({ ...formState, [event.target.name]: event.target.value })
    }

    async function createNew(event) {
        event.preventDefault()

        try {
            const response = await axios.post(`${BASE_URL}events/`, formState)
            if (response.status === 201) {
                console.log('success!')
            } else {
                console.log('oopsy woopsie, I made a little fucko boingo')
            }
        } catch (error) {
            console.log(error.message)
        }
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
                    <button className='medButton' type='submit'>Create Event</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}