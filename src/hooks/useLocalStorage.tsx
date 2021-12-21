import {useEffect, useReducer} from 'react'
import {Gift} from '../data'

interface Action {
  type: string
  payload?: any //TODO: check type
}

function reducer(state: Gift[], action: Action) {
  switch (action.type) {
    case 'add': //TODO: check if it's de better place for the logic code
      const newItem: Gift[] = state.filter((gift: Gift) => {
        return gift.name.toLowerCase() === action.payload.name.toLowerCase()
      })
      if (newItem.length > 0) {
        return state
      } else {
        return [...state, action.payload]
      }
    case 'update':
      const filterState = state.filter(gift => gift.id !== action.payload.id)
      return [...filterState, action.payload]
    case 'delete':
      return state.filter(gift => gift.id !== action.payload)
    case 'deleteAll':
      return []
    default:
      return state
  }
}

export const useLocalStorage = () => {
  const [state, dispatch] = useReducer(reducer, [], () => {
    const data = window.localStorage.getItem('gifts')
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem('gifts', JSON.stringify(state))
  }, [state])

  return [state, dispatch] as const
}
