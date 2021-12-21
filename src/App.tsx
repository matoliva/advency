import {SyntheticEvent, useEffect, useState} from 'react'
import {GiftList} from './components/GiftList'
import './App.css'

import {v4 as uuidv4} from 'uuid'
import {useLocalStorage} from './hooks/useLocalStorage'

function App() {
  const [formValues, setFormValues] = useState({name: '', quantity: 0, url: ''})

  const [data, dispatch] = useLocalStorage()

  useEffect(() => {
    dispatch({
      type: 'init',
      payload: data,
    })
  }, [data, dispatch])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (!formValues.name) return
    const newData = {
      id: uuidv4(),
      name: formValues.name,
      quantity: formValues.quantity,
      url: formValues.url,
    }

    dispatch({
      type: 'add',
      payload: newData,
    })

    setFormValues({name: '', quantity: 0, url: ''})
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
          placeholder="Add your gift"
        />
        <input
          type="number"
          name="quantity"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formValues.quantity}
        />
        <input
          type="text"
          name="url"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={formValues.url}
          placeholder="http://image..."
        />
        <button className="btn">Add</button>
      </form>
      <GiftList gifts={data} handleDelete={handleDelete} />
      {data.length > 0 ? (
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
