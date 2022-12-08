import React from 'react'
import styles from './alertRFC.module.scss'

interface IProps {
  icon: React.ReactNode
  message: string
  error?: string
}

const alert: React.FC<IProps> = ({ icon, message, error }) => {
  const errorStyle =
    error === 'alert-block' ? styles.alertBlock : styles.alertNone

  return (
    <div className={errorStyle}>
      <div>{icon}</div>
      <div className={styles.message}>{message}</div>
    </div>
  )
}

export default alert
