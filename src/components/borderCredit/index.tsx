import React, { useState } from 'react'
import Steps from './organisms/steps/Steps'
import styles from './index.module.scss'
import { Formik } from 'formik'
import ValidateRFCStep from './organisms/validateRFCStep/ValidateRFCStep'
import INEStep from './organisms/ineStep/INEStep'
import DomicileStep from './organisms/domicileStep/DomicileStep'
import ValidatePhoneStep from './organisms/validatePhoneStep/ValidatePhoneStep'
import ValidateSmsStep from './organisms/validateSmsStep/ValidateSmsStep'
import AccountStatusStep from './organisms/accountStatusStep/AccountStatusStep'
import Calculator from './organisms/calculator/Calculator'
import Success from './organisms/success/Success'
import Error from './organisms/error/Error'

export interface formValues {
  fullName: string
  rfc: string
  transactionId: string
  requestNumber: string
  curp: string
  company: string
  address: string
  cellphone: string
  validCellphone: boolean
  age: number
  salary: number
  requiredAmount: number
  monts: number
  tycBorder: boolean
  tycMox: boolean
  ineFront: string
  ineFrontName: string
  ineBack: string
  ineBackName: string
  selfie: string
  selfieName: string
  domicile: string
  domicileName: string
  accountStatus: string
  accountStatusName: string
}

const BorderCreditForm: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [error, setError] = useState(false)

  const initialValues: formValues = {
    fullName: '',
    rfc: '',
    transactionId: '',
    requestNumber: '',
    curp: '',
    company: '',
    address: '',
    cellphone: '',
    validCellphone: false,
    age: 0,
    salary: 0,
    requiredAmount: 0,
    monts: 0,
    tycBorder: false,
    tycMox: false,
    ineFront: '',
    ineFrontName: '',
    ineBack: '',
    ineBackName: '',
    selfie: '',
    selfieName: '',
    domicile: '',
    domicileName: '',
    accountStatus: '',
    accountStatusName: ''
  }

  const handleSubmit = (values: formValues) => {
    setStep(prev => prev + 1)
    console.log(values)
  }
  return (
    <div className={styles.wrapper}>
      <Steps step={step} setStep={setStep} />
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}
      >
        {() => (
          <>
            {!error ? (
              <>
                {step === 1 && <ValidateRFCStep setStep={setStep} />}
                {step === 2 && <INEStep setStep={setStep} />}
                {step === 3 && <DomicileStep setStep={setStep} />}
                {step === 4 && <ValidatePhoneStep setStep={setStep} />}
                {step === 5 && (
                  <ValidateSmsStep setStep={setStep} disqualified={setError} />
                )}
                {step === 6 && <AccountStatusStep setStep={setStep} />}
                {step === 7 && <Calculator setStep={setStep} />}
                {step === 8 && <Success />}
              </>
            ) : (
              <Error />
            )}
          </>
        )}
      </Formik>
    </div>
  )
}

export default BorderCreditForm
