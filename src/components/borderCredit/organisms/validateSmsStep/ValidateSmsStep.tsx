import React, { useEffect, useState } from 'react'
import { Formik, useFormikContext } from 'formik'
import Image from 'next/image'
import OtpInput from 'react-otp-input'
import { RefreshCcw } from 'feather-icons-react'
import { requestData } from '@helpers/requestData'
import MessageError from '@components/borderCredit/atoms/messageError/messageError'
import phone from '@assets/img/phoneValidation.svg'
import Footer from '@components/borderCredit/molecules/footer/Footer'
import type { formValues } from '@components/borderCredit'
import style from './validateSmsStep.module.scss'
import Loader from '@components/borderCredit/atoms/loader/Loader'
import { searchHook } from '@helpers/borderHook'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
  disqualified: React.Dispatch<React.SetStateAction<boolean>>
}

interface data {
  otp: string
}

const ValidateSmsStep: React.FC<IProps> = ({ setStep, disqualified }) => {
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState(false)
  const [disableOTP, setDisableOTP] = useState(false)
  const [seconds, setSeconds] = useState<number>(60)

  const { values: fValues, setFieldValue } = useFormikContext<formValues>()
  const initialValues: data = {
    otp: ''
  }

  useEffect(() => {
    if (disableOTP && seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1)
        clearTimeout(timer)
      }, 1000)
    } else {
      setDisableOTP(false)
    }
  }, [disableOTP, seconds])

  const handleSubmit = async (values: data) => {
    setLoader(false)
    if (!values.otp) setError(true)
    const { error, loaded } = await requestData(
      `${process.env.NEXT_PUBLIC_BORDER_URL}/validate/otp`,
      'POST',
      {
        data: {
          cellphone: fValues.cellphone,
          otp: values.otp
        }
      },
      {
        'x-api-key': 'b33c881f-886d-44d0-aa98-98c7cd5584d9',
        'message-id': Date.now(),
        transactionId: fValues.transactionId
      }
    )
    if (!error && loaded) {
      setFieldValue('validCellphone', true)
      const hook = (await searchHook(
        {
          data: {
            transactionId: fValues.transactionId
          }
        },
        `${process.env.NEXT_PUBLIC_BORDER_URL}/validate/state`,
        {
          'x-api-key': 'b33c881f-886d-44d0-aa98-98c7cd5584d9',
          'message-id': Date.now(),
          transactionId: fValues.transactionId
        }
      )) as { age: number; salary: number; account: boolean; company?: string }

      if (hook) {
        if (hook.account) {
          setFieldValue('age', hook.age)
          setFieldValue('salary', hook.salary)
          setStep(step => step + 2)
          setLoader(true)
        } else {
          setFieldValue('age', hook.age)
          setFieldValue('salary', hook.salary)
          setFieldValue('company', hook.company)
          setLoader(true)
          setStep(step => step + 1)
        }
      } else {
        setLoader(true)
        disqualified(true)
      }
    } else {
      setError(true)
      setLoader(loaded)
      console.log(error)
    }
  }

  const resentOtp = async (values: string) => {
    const { error, loaded } = await requestData(
      `${process.env.NEXT_PUBLIC_BORDER_URL}/send/otp`,
      'POST',
      {
        data: {
          cellphone: values
        }
      },
      {
        'x-api-key': 'b33c881f-886d-44d0-aa98-98c7cd5584d9',
        'message-id': Date.now(),
        transactionId: fValues.transactionId
      }
    )
    if (!error && loaded) {
      setDisableOTP(true)
      setSeconds(60)
    } else {
      console.log(error)
    }
  }

  return (
    <>
      {loader ? (
        <Formik
          initialValues={initialValues}
          onSubmit={values => handleSubmit(values)}
        >
          {({ values, setFieldValue, handleSubmit }) => (
            <>
              <div className={style.wrapper}>
                <div className={style.formContainer}>
                  <div className={style.containerTitle}>
                    <h3 className={style.formTitle}>
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
                  <div className={style.containerTyc}>
                    {error && (
                      <MessageError
                        message="El código introducido no coincide"
                        error="message-block"
                      />
                    )}
                    <p className={style.span}>
                      Ingresa el código de 6 dígitos que enviamos al número
                      {fValues.cellphone}
                    </p>
                    <button
                      onClick={() => resentOtp(fValues.cellphone)}
                      className={style.resend}
                    >
                      Volver a enviar el código
                      <RefreshCcw className={style.iconRefresh} />
                    </button>
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
      ) : (
        <Loader />
      )}
    </>
  )
}

export default ValidateSmsStep
