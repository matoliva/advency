import {SyntheticEvent, useState} from 'react'
import {GiftList} from './components/GiftList'
import './App.css'

import {v4 as uuidv4} from 'uuid'
import {useLocalStorage} from './hooks/useLocalStorage'
import {Modal} from './components/Modal'

function App() {
  const [formValues, setFormValues] = useState({
    name: '',
    quantity: 0,
    url: '',
    to: '',
  })

  const [isOpen, setIsOpen] = useState(false)

  const [data, dispatch] = useLocalStorage()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (!formValues.name) return
    const newData = {
      id: uuidv4(),
      name: formValues.name,
      quantity: formValues.quantity,
      url: formValues.url,
      to: formValues.to,
    }

    dispatch({
      type: 'add',
      payload: newData,
    })

    setFormValues({name: '', quantity: 0, url: '', to: ''})
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

  //Modal method
  const handleOnClose = (e: any) => {
    setIsOpen(false)
  }

  const handleModalClick = () => {
    setIsOpen(true)
  }

  return (
    <div className="app">
      <h1>Advency Gifts</h1>
      <button
        className="btn"
        style={{padding: '0.5rem 2rem'}}
        onClick={handleModalClick}
      >
        Add
      </button>
      <GiftList gifts={data} handleDelete={handleDelete} />
      {data.length > 0 ? (
        <button
          className="btn btn-danger"
          style={{padding: '0.5rem 1rem'}}
          onClick={handleDeleteAll}
        >
          Delete All
        </button>
      ) : (
        <h3>There are not gifts, you're a Grinch!</h3>
      )}
      <Modal isOpen={isOpen} message="Add gifts" onClose={handleOnClose}>
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
          <input
            type="text"
            name="to"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={formValues.to}
            placeholder="To..."
          />
          <button type="submit" className="btn">
            Add
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default App
