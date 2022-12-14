import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import AccountStatusStep from '@components/borderCredit/organisms/accountStatusStep/AccountStatusStep'
import DomicileStep from '@components/borderCredit/organisms/domicileStep/DomicileStep'
import INEStep from '@components/borderCredit/organisms/ineStep/INEStep'
import Stepper from '@components/borderCredit/molecules/stepper/Stepper'
import StepperMobile from '@components/borderCredit/atoms/stepperMobile/StepperMobile'
import styles from './InputContainer.module.scss'

type IV = {
  ineFront: string
  ineBack: string
  selfie: string
  domicile: string
  accountStatus: string
}

const InputContainer = () => {
  const [step, setStep] = useState(1)

  const initialValues: IV = {
    ineFront: '',
    ineBack: '',
    selfie: '',
    domicile: '',
    accountStatus: ''
  }

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
    <div className={styles.container}>
      <div className={styles.steps}>
        <div className={styles.desktop}>
          <Stepper step={step} titles={stepperTitles} />
        </div>
        <div className={styles.mobile}>
          <StepperMobile step={step} maxStep={stepperTitles.length} />
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: IV) => {
          console.log(values)
        }}
      >
        {() => (
          <Form>
            {step === 2 && <INEStep setStep={setStep} />}
            {step === 3 && <DomicileStep setStep={setStep} />}
            {step === 6 && <AccountStatusStep setStep={setStep} />}
            <button type="button" onClick={() => setStep(step => step - 1)}>
              back
            </button>
            <button type="button" onClick={() => setStep(step => step + 1)}>
              next
            </button>
            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default InputContainer
