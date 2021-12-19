import './gift-list.css'
import {gifts} from '../data'

export const GiftList = (props: any) => {
  return (
    <ul className="gift-list">
      {props.gifts.map((gift: any) => (
        <li key={gift.id} className="list-item">
          {gift.name}
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
