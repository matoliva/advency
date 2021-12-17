import {Gifts} from '../data'
import './gift-list.css'

export const GiftList = ({data}: Gifts) => {
  return (
    <ul className="gift-list">
      {data.map(({id, name}) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  )
}
