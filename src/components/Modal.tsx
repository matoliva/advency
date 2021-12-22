import ReactDOM from 'react-dom'
import './modal.css'

interface Props {
  isOpen: boolean
  message: string
  onClose: any
  children: React.ReactNode
  isPrintable?: boolean
}

export const Modal = ({
  isOpen,
  message,
  onClose,
  children,
  isPrintable,
}: Props) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <h1>{message}</h1>
        {children}
        <button className="btn btn-danger modal-print" onClick={onClose}>
          Close
        </button>
        {isPrintable && (
          <button className="btn modal-print" onClick={() => window.print()}>
            Print
          </button>
        )}
      </div>
    </div>,
    document.body,
  )
}
