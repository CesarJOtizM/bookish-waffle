import React, { useState } from 'react'
import MessageError from '../../atoms/messageError/messageErorr'
import { Formik, useFormikContext } from 'formik'
import style from './validateSmsStep.module.scss'
import Link from 'next/link'
import { RefreshCcw } from 'feather-icons-react'
import phone from '../../../../assets/img/phoneValidation.svg'
import Image from 'next/image'
import OtpInput from 'react-otp-input'
import Footer from '../../molecules/footer/Footer'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

interface data {
  otp: string
}

const ValidateSmsStep: React.FC<IProps> = ({ setStep }) => {
  const [error, setError] = useState(false)
  const { setFieldValue } = useFormikContext()
  const initialValues: data = {
    otp: ''
  }

  const handleSubmit = (values: data) => {
    console.log(values)
    if (values.otp !== '111111') {
      setError(true)
    } else {
      setError(false)
      setFieldValue('cellphone', values.otp)
      setStep(prev => prev + 1)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => handleSubmit(values)}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <>
          <div className={style.wrapper}>
            <div className={style.formcontainer}>
              <div className={style.containertitle}>
                <h3 className={style.formtitle}>
                  Ingresa el código que recibiste por SMS
                </h3>
              </div>
              {/* <div className={style.containerinput}> */}
              <OtpInput
                value={values.otp}
                onChange={(otp: string) => {
                  setFieldValue('otp', otp)
                }}
                numInputs={6}
                isInputNum={true}
                inputStyle={style.input}
                containerStyle={style.inputContainer}
                errorStyle={style.inputError}
                hasErrored={error}
                shouldAutoFocus={true}
              />
              {/* </div> */}
              <div className={style.containertyc}>
                {error && (
                  <MessageError
                    message="El código introducido no coincide"
                    error="message-block"
                  />
                )}
                <p className={style.span}>
                  Ingresa el código de 6 dígitos que enviamos al número +52 123
                  123 123
                </p>
                <Link href="/border" className={style.resend}>
                  Volver a enviar el código
                  <RefreshCcw className={style.iconrefresh} />
                </Link>
              </div>
            </div>
            <div className={style.imageContainer}>
              <Image
                src={phone}
                alt={'Phone validation image'}
                height={308}
                width={232}
                priority
              />
            </div>
          </div>
          <Footer
            text="Continuar"
            action={handleSubmit}
            prev
            setStep={setStep}
          />
        </>
      )}
    </Formik>
  )
}

export default ValidateSmsStep
