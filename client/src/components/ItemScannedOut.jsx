import Done from "./Done"

export default function ItemScannedOut({ item }) {
    let broken
    if (item.needs_repair) {
        broken =
            <p style={{color:'brown'}}>WARNING: This item has been reported broken. Please verify safety before use.</p>
    }

    return (
        <div className='itemScannedOut'>
            <div className='card'>
                <h2>{item.desc}</h2>
                {broken}
                <img src={item.img} />
                <p>Notes: {item.instructions}</p>
            </div>
            <Done />
        </div>
    )
}