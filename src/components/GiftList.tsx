import DefaultImage from '../assets/images/default-image.jpeg'
import './gift-list.css'

export const GiftList = (props: any) => {
  return (
    <ul className="gift-list">
      {props.gifts &&
        props.gifts.map((gift: any) => (
          <li key={gift.id} className="list-item">
            <img src={gift.url || DefaultImage} alt={gift.name} />
            {`${gift.name} (${gift.quantity}) to: ${gift.to ? gift.to : 'N/A'}`}
            <button
              className="btn"
              onClick={() => props.handleModalClick(gift)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => props.handleDelete(gift.id)}
            >
              x
            </button>
          </li>
        ))}
    </ul>
  )
}
