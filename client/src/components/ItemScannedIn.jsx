import DoneCheck from "./DoneCheck"
import axios from "axios"
import { BASE_URL } from "../../globals"
import { useEffect, useState } from "react"


export default function ItemScannedIn({ item }) {

    const [itemBroken, setItemBroken] = useState(item.needs_repair)

    let broken

    async function toggleBroken() {
        const currentItem = item
        if (itemBroken) {
            currentItem.needs_repair = false
            const result = await axios.put(`${BASE_URL}items/${item.item_id}`, currentItem)
            setItemBroken(() => false)
        } else {
            currentItem.needs_repair = true
            const result = await axios.put(`${BASE_URL}items/${item.item_id}`, currentItem)
            setItemBroken(() => true)
        }
    }

    if (item.needs_repair) {
        broken =
            <p style={{ color: 'brown' }}>WARNING: This item has been reported broken. Please verify safety before use.</p>
    } else {
        broken = null
    }

    return (
        <div className='itemScannedIn'>
            <div className='card'>
                <div className='toggleBroken'>
                    <label>
                        Item broken?
                        <input
                            type='checkbox'
                            id='broken'
                            name='broken'
                            onChange={toggleBroken}
                            checked={itemBroken}
                        />
                    </label>
                </div>
                <h2>{item.desc}</h2>
                {broken}
                <img src={item.img} />
                <p>Notes: {item.instructions}</p>
            </div>
            <DoneCheck />
        </div>
    )
}