import React from 'react'
import styles from './errorModal.module.scss'
import { AlertTriangle } from 'feather-icons-react'

const ErrorModal: React.FC<IProps> = ({ isShowing, hide, title, desc }) => {
  const active = isShowing ? styles.active : ''

  return (
    <div className={`${styles.modalContainer} ${active}`}>
      <div className={styles.modalOverlay} />
      <div className={styles.modalWrapper} onClick={() => hide()}>
        <div className={styles.modal}>
          <AlertTriangle size="40px" />
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  )
}

interface IProps {
  isShowing: boolean
  hide: () => void
  title: string
  desc: string
}

export default ErrorModal
