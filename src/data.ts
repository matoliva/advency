import {v4 as uuidv4} from 'uuid'

export interface Gift {
  id: string
  name: string
  imgUrl?: string
  amount?: number
}

export const gifts: Gift[] = [
  {
    id: uuidv4(),
    name: 'Baloon',
  },
  {
    id: uuidv4(),
    name: 'Socks',
  },
  {
    id: uuidv4(),
    name: 'Battleship',
  },
]

export const getGifts = () => {
  return gifts
}
