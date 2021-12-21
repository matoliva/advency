import {SyntheticEvent, useEffect, useReducer, useState} from 'react'
import {GiftList} from './components/GiftList'
import {Gift} from './data'
import './App.css'

import {v4 as uuidv4} from 'uuid'
import {useLocalStorage} from './hooks/useLocalStorage'

interface Action {
  type: string
  payload?: any //TODO: check type
}

function reducer(state: Gift[], action: Action) {
  switch (action.type) {
    case 'init':
      debugger
      return action.payload
    case 'add': //TODO: check if it's de better place for the logic code
      debugger
      const newItem: Gift[] = state.filter((gift: Gift) => {
        return gift.name.toLowerCase() === action.payload.name.toLowerCase()
      })
      if (newItem.length > 0) {
        return state
      } else {
        debugger
        return [...state, action.payload]
      }
    case 'delete':
      return state.filter(gift => gift.id !== action.payload)
    case 'deleteAll':
      return []
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, [
    {id: '', name: '', quantity: 0},
  ])

  const [formValues, setFormValues] = useState({name: '', quantity: 0})

  const [data, setData] = useLocalStorage('gifts', [])

  useEffect(() => {
    dispatch({
      type: 'init',
      payload: data,
    })
  }, []) //Check this dependency

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (!formValues.name) return
    const newData = {
      id: uuidv4(),
      name: formValues.name,
      quantity: formValues.quantity,
    }

    dispatch({
      type: 'add',
      payload: newData,
    })

    setData([...data, newData])

    setFormValues({name: '', quantity: 0})
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      handleSubmit(e)
    }
  }

  const handleDelete = (id: string) => {
    dispatch({
      type: 'delete',
      payload: id,
    })

    setData(data.filter((gift: Gift) => gift.id !== id))
  }

  const handleDeleteAll = () => {
    dispatch({
      type: 'deleteAll',
    })

    setData([]) //TODO: Discuss how to implement localstorage hook
  }

  return (
    <div className="app">
      <h1>Advency Gifts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formValues.name}
        />
        <input
          type="number"
          name="quantity"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formValues.quantity}
          style={{maxWidth: '2rem', margin: '0 0.5rem 0 0.5rem'}}
        />
        <button className="btn">Add</button>
      </form>
      <GiftList gifts={state} handleDelete={handleDelete} />
      {state?.length > 0 ? (
        <button className="btn btn-danger" onClick={handleDeleteAll}>
          Delete All
        </button>
      ) : (
        <h3>There are not gifts, you're a Grinch!</h3>
      )}
    </div>
  )
}

export default App
