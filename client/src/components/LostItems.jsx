import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../../globals"

//recheckLost drags the whole axios call function from the last page into here through props, so that every time an item is marked lost and deleted from the database, it refreshes the list
export default function LostItems({ item, recheckLost }) {

    console.log('itemid', item.item_id)

    let broken
    if (item.needs_repair) {
        broken =
            <p style={{ color: 'brown' }}>WARNING: This item has been reported broken. Please verify safety before use.</p>
    }

    async function deleteItem(){
        try {
            const result = await axios.delete(`${BASE_URL}items/${item.item_id}`)
            if (result.status == 204){
                console.log('success')
                recheckLost()
            }
        } catch (error){
            console.log(error.message)
        }
    }

    return (
        <div className='lostItems'>
            <div className='card'>
                <button className='lost' onClick={deleteItem}>Item lost</button>
                <h2>{item.desc}</h2>
                {broken}
                <img src={item.img} />
                <p>Notes: {item.instructions}</p>
            </div>
        </div>
    )
}