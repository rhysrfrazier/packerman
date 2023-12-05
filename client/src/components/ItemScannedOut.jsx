import Done from "./Done"

export default function ItemScannedOut({ item }) {
    let broken
    if (item.needs_repair) {
        broken =
            <p>WARNING: this item has been reported broken. Please verify safety before use.</p>
    }

    return (
        <div className='itemScannedOut'>
            <div className='card'>
                <h2>{item.desc}</h2>
                {broken}
                <p>{item.instructions}</p>
                <img src={item.img} />
            </div>
            <Done />
        </div>
    )
}