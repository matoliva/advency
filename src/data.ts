import {v4 as uuidv4} from 'uuid'

export interface Gift {
  id: string
  name: string
  url?: string
  quantity?: number
  to?: string
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

export const randomGifts = [
  {
    name: 'Balloon',
    quantity: 1,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs42nqk7SDx64qrdTdwb5kYqC9bPhFOHOaPMGS1waW_y09710Zm0drdFGYgi2GBq5PQZk&usqp=CAU',
    to: '',
  },
  {
    name: 'Socks',
    quantity: 1,
    url: 'https://b3h2.scene7.com/is/image/BedBathandBeyond/2021-10-12-13-19_194135508507_imageset?$imagePLP$&wid=256&hei=256',
    to: '',
  },
  {
    name: 'Battleship',
    quantity: 1,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo_HocKqoCCixGbkNk3gl5vs-OyO-LhKo1z7zzu_Be0JgR2lZGfuTqMqxv50BL8xIQM6E&usqp=CAU',
    to: '',
  },
]
