import React from 'react'
import styles from './messageError.module.scss'

interface IProps {
  message: string
  error?: string
}

const MessageError: React.FC<IProps> = ({ message, error }) => {
  const errorStyle =
    error === 'message-block' ? styles.messageBlock : styles.messageNone

  return <div className={errorStyle}>{message}</div>
}

export default MessageError
