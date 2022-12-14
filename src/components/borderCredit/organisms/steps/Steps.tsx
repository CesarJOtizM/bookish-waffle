import React from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'feather-icons-react'
import Stepper from '@components/borderCredit/molecules/stepper/Stepper'
import StepperMobile from '@components/borderCredit/atoms/stepperMobile/StepperMobile'
import Logo from '@assets/img/LogoBorderCredit.png'
import styles from './steps.module.scss'

interface IProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Steps: React.FC<IProps> = ({ step, setStep }) => {
  const stepperTitles = [
    'Cargar RFC',
    'INE y Selfie',
    'Domicilio',
    'Nº de teléfono',
    'Código OTP',
    'Estado de cuenta',
    'Pre oferta'
  ]

  return (
    <header className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <Image src={Logo} alt="Logo border Credit" width={200} height={50} />
      </div>

      <div className={styles.steps}>
        <div className={styles.desktop}>
          <Stepper step={step > 7 ? 7 : step} titles={stepperTitles} />
        </div>
        {step !== 8 && (
          <div className={styles.mobile}>
            {step > 1 && (
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setStep(step => step - 1)}
              >
                <ArrowLeft size="24" />
              </button>
            )}
            <StepperMobile step={step} maxStep={stepperTitles.length} />
          </div>
        )}
      </div>
    </header>
  )
}

export default Steps
