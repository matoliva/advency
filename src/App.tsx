import {SyntheticEvent, useEffect, useReducer, useState} from 'react'
import {GiftList} from './components/GiftList'
import {Gift, gifts, Gifts} from './data'
import './App.css'

import {v4 as uuidv4} from 'uuid'

interface Action {
  type: string
  payload: Gift
}

function reducer(state: Gifts, action: Action) {
  switch (action.type) {
    case 'add':
      const {data} = state
      const newItems = [...data, action.payload]
      return {...state, data: newItems}
    default:
      return state
  }
}

function App() {
  const {data} = gifts
  const initialState = {data}

  const [state, dispatch] = useReducer(reducer, initialState)

  const [formValues, setFormValues] = useState({name: ''})

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
        <button>Add</button>
      </form>
      <GiftList data={state.data} />
    </div>
  )
}

export default App
