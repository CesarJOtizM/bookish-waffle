import React from 'react'
import styles from './inputSMS.module.scss'

interface IProps {
  error?: string
}

const inputSMS: React.FC<IProps> = ({ error }) => {
  const errorStyle =
    error === 'alert-block' ? styles.alertBlock : styles.alertNone

  return (
    <div className={styles.inputDiv}>
      <input type="text" className={errorStyle} />
    </div>
  )
}

export default inputSMS
