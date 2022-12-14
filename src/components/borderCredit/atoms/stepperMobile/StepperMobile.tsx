import React from 'react'
import styles from './stepperMobile.module.scss'

interface IProps {
  maxStep: number
  step: number
}

const StepperMobile: React.FC<IProps> = ({ step, maxStep }) => {
  return (
    <div className={styles.container}>
      <p>
        Paso {step} de {maxStep}
      </p>
      <div className={styles.steps}>
        {[...Array(maxStep)].map((e, i) => (
          <div
            className={`${styles.step} ${i + 1 === step ? styles.active : ''}`}
            key={i}
          />
        ))}
      </div>
    </div>
  )
}

export default StepperMobile
