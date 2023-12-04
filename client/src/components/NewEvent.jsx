import PackUnpackHeader from "./PackUnpackHeader"
import Footer from "./Footer"
import { useState } from "react"
import axios from "axios"

export default function NewEvent() {

    const [formState, setFormState] = useState({})

    function createNew(event) {
        event.preventDefault()
    }

    return (
        <div className='componentDiv'>
            <PackUnpackHeader />
            <div className='componentBody'>
                <form onSubmit={createNew}>
                    <label>
                        Event Name:
                        <br />
                        <input type='text' name='name' /> 
                    </label>
                    <br/>
                    <label>
                        Start Date:
                        <br />
                        <input type='date' name='start_date' />
                    </label>
                    <br/>
                    <label>
                        End Date:
                        <br />
                        <input type='date' name='end_date' />
                    </label>
                    <br/>
                    <label>
                        Event Type:
                        <br />
                        <input type='text' name='event_type' />
                    </label>
                    <br/>
                    <button type='submit'>Create Event</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}