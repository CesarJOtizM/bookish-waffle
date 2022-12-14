import React, { useState } from 'react'
import { Field, Formik, useFormikContext } from 'formik'
import Image from 'next/image'
import { requestData } from '@helpers/requestData'
import Footer from '@components/borderCredit/molecules/footer/Footer'
import phone from '@assets/img/phoneValidation.svg'
import type { formValues } from '@components/borderCredit'
import style from './validatePhoneStep.module.scss'
import Loader from '@components/borderCredit/atoms/loader/Loader'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

interface phoneData {
  cellphone: string
}
const ValidatePhoneStep: React.FC<IProps> = ({ setStep }) => {
  const [loader, setLoader] = useState(true)
  const { values: fValues, setFieldValue } = useFormikContext<formValues>()
  const initialValues: phoneData = {
    cellphone: fValues.cellphone || '+52'
  }

  const handleSubmit = async (values: phoneData) => {
    setLoader(false)
    const { error, loaded } = await requestData(
      `${process.env.NEXT_PUBLIC_BORDER_URL}/send/otp`,
      'POST',
      {
        data: {
          cellphone: values.cellphone
        }
      },
      {
        'x-api-key': 'b33c881f-886d-44d0-aa98-98c7cd5584d9',
        'message-id': Date.now(),
        transactionId: fValues.transactionId
      }
    )
    if (!error && loaded) {
      setFieldValue('cellphone', values.cellphone)
      setLoader(loaded)
      setStep(step => step + 1)
    } else {
      setLoader(loaded)
      console.log(error)
    }
  }

  return (
    <>
      {loader ? (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <>
              <div className={style.wrapper}>
                <div className={style.formContainer}>
                  <div>
                    <h3 className={style.formTitle}>
                      Ingresa tu número de teléfono
                    </h3>
                  </div>
                  <div className={style.containerInput}>
                    <Field
                      type="text"
                      name="cellphone"
                      className={style.rfcInput}
                      placeholder="(+52) 123 123 123"
                    />
                  </div>
                  <div className={style.containerTyc}>
                    <p className={style.span}>
                      Enviaremos un SMS con un código de validación para
                      confirmar que este número te pertenece, consulta nuestros{' '}
                      <strong>Términos de Servicio</strong> para más información
                    </p>
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

export default ValidatePhoneStep
