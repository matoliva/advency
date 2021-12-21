import ReactDOM from 'react-dom'
import './modal.css'

interface Props {
  isOpen: boolean
  message: string
  onClose: any
  children: React.ReactNode
}

export const Modal = ({isOpen, message, onClose, children}: Props) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <h1>{message}</h1>
        {children}
        <button className="btn btn-danger" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body,
  )
}
