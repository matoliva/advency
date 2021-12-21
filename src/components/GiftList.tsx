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
            {` - $${(gift.price * gift.quantity)
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
            <button
              className="btn"
              onClick={() => props.handleModalClick(gift, 'edit')}
            >
              Edit
            </button>
            <button
              className="btn"
              onClick={() => props.handleModalClick(gift, 'duplicate')}
            >
              Duplicate
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
