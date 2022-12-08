import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import Stepper from '../../molecules/stepper/Stepper'
import StepperMobile from '../../molecules/stepperMobile/StepperMobile'
import styles from './steps.module.scss'
import Logo from '../../../../assets/img/LogoBorderCredit.png'
import { ArrowLeft } from 'feather-icons-react'

interface IProps {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const Steps: React.FC<IProps> = ({ step, setStep }) => {
  const [WindowSize, setWindowSize] = useState<number>(0)

  const stepperTitles = [
    'Cargar RFC',
    'INE y Selfie',
    'Domicilio',
    'Nº de teléfono',
    'Código OTP',
    'Estado de cuenta',
    'Pre oferta'
  ]

  const handleWindowResize = useCallback(() => {
    setWindowSize(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [handleWindowResize])

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
