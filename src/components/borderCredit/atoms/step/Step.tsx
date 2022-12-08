import React from 'react'
import styles from './step.module.scss'

interface IProps {
  step: number
  title: string
  status: 'Completado' | 'En proceso' | 'Pendiente'
}

const Step: React.FC<IProps> = ({ step, title, status = 'Pendiente' }) => {
  const statusStyles = `${styles.step} ${
    status === 'En proceso'
      ? styles.stepProcess
      : status === 'Completado'
      ? styles.stepDone
      : ''
  }`

  return (
    <div className={statusStyles}>
      <div className={styles.circle}>
        <span />
      </div>
      <div className={styles.stepCounter}>Paso {step}</div>
      <div className={styles.title}>{title}</div>
      {/* <div className={styles.status}>{status}</div> */}
    </div>
  )
}

export default Step
