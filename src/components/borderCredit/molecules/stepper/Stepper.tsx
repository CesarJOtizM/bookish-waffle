import React from 'react'
import Step from '@components/borderCredit/atoms/step/Step'
import styles from './stepper.module.scss'

interface IProps {
  step: number
  titles: string[]
}

const Stepper: React.FC<IProps> = ({ step, titles }) => {
  // const [length] = useState(titles.length)

  return (
    <div className={styles.container}>
      {titles.map((e, i) => (
        <Step
          key={i}
          step={i + 1}
          title={e}
          status={
            i + 1 < step
              ? 'Completado'
              : i + 1 === step
              ? 'En proceso'
              : 'Pendiente'
          }
        />
      ))}
    </div>
  )
}

export default Stepper
