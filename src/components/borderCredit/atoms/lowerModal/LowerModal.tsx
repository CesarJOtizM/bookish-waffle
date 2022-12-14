import React, { useState } from 'react'
import styles from './lowerModal.module.scss'

interface IProps {
  title: string
  description: string
}

const LowerModal: React.FC<IProps> = ({ title, description }) => {
  const [modal, setModal] = useState(true)

  return (
    <div
      className={`${styles.modal} ${modal && styles.active}`}
      onClick={() => setModal(!modal)}
    >
      <div className={styles.card}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default LowerModal
