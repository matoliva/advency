import {v4 as uuidv4} from 'uuid'

export interface Gift {
  id: string
  name: string
  url?: string
  quantity?: number
}

export const gifts: Gift[] = [
  {
    id: uuidv4(),
    name: 'Baloon',
    quantity: 1,
  },
  {
    id: uuidv4(),
    name: 'Socks',
    quantity: 1,
  },
  {
    id: uuidv4(),
    name: 'Battleship',
    quantity: 1,
  },
]

export const getGifts = () => {
  return gifts
}
