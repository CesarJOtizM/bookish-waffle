import { Field, Formik, useFormikContext } from 'formik'
import React from 'react'
import Footer from '../../molecules/footer/Footer'
import style from './validatePhoneStep.module.scss'
import phone from '../../../../assets/img/phoneValidation.svg'
import Image from 'next/image'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

interface data {
  cellphone: string
}
const ValidatePhoneStep: React.FC<IProps> = ({ setStep }) => {
  const { setFieldValue } = useFormikContext()
  const initialValues: data = {
    cellphone: ''
  }

  const handleSubmit = (values: data) => {
    console.log(values)
    setFieldValue('cellphone', values.cellphone)
    setStep(prev => prev + 1)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => handleSubmit(values)}
    >
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
                  Enviaremos un SMS con un código de validación para confirmar
                  que este número te pertenece, consulta nuestros{' '}
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
  )
}

export default ValidatePhoneStep
