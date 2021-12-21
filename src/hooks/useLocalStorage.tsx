import {useEffect, useState} from 'react'
import {Gift} from '../data'

export const useLocalStorage = (key: string, defaultValue: Gift | [] = []) => {
  const [state, setState] = useState(() => {
    const data = window.localStorage.getItem(key)
    if (data) {
      debugger
      return JSON.parse(data)
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
