import React from 'react'
import styles from './tooltip.module.scss'

interface Iprops {
  text: string
  children: React.ReactNode
}

const Tooltip: React.FC<Iprops> = ({ children, text }) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <p className={styles.tooltipText}>{text}</p>
    </div>
  )
}

export default Tooltip
