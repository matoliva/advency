import {SyntheticEvent, useEffect, useReducer, useState} from 'react'
import {GiftList} from './components/GiftList'
import {getGifts, Gift} from './data'
import './App.css'

import {v4 as uuidv4} from 'uuid'

interface Action {
  type: string
  payload?: any //TODO: check type
}

function reducer(state: Gift[], action: Action) {
  switch (action.type) {
    case 'init':
      return action.payload
    case 'add':
      return [...state, action.payload]
    case 'delete':
      return state.filter(gift => gift.id !== action.payload)
    case 'deleteAll':
      return []
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, [{id: '', name: ''}])

  const [formValues, setFormValues] = useState({name: ''})

  useEffect(() => {
    dispatch({
      type: 'init',
      payload: getGifts(),
    })
  }, [])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (!formValues.name) return

    dispatch({
      type: 'add',
      payload: {id: uuidv4(), name: formValues.name},
    })

    setFormValues({name: ''})
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
  }

  const handleDeleteAll = () => {
    dispatch({
      type: 'deleteAll',
    })
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
        <button className="btn">Add</button>
      </form>
      <GiftList gifts={state} handleDelete={handleDelete} />
      {state.length > 0 ? (
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
