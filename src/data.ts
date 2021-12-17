import {v4 as uuidv4} from 'uuid'

export interface Gift {
  id: string
  name: string
  imgUrl?: string
  amount?: number
}

export interface Gifts {
  data: Gift[]
}

export const gifts: Gifts = {
  data: [
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
  ],
}
