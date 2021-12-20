import './gift-list.css'

export const GiftList = (props: any) => {
  return (
    <ul className="gift-list">
      {props.gifts.map((gift: any) => (
        <li key={gift.id} className="list-item">
          {`${gift.name} (${gift.quantity})`}
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
