import { Field, Formik, useFormikContext } from 'formik'
import React from 'react'
import Footer from '../../molecules/footer/Footer'
import styles from './validateRFCStep.module.scss'
import Alert from '../../atoms/AlertRFC/alertRFC'
import { AlertTriangle } from 'feather-icons-react'
import Image from 'next/image'
import RFCImage from '../../../../assets/img/Rfc.png'
import * as Yup from 'yup'

interface data {
  rfc: string
  tycBorder: boolean
  tycMox: boolean
}

interface Iprops {
  setStep: React.Dispatch<React.SetStateAction<number>>
}
const ValidateRFCStep: React.FC<Iprops> = ({ setStep }) => {
  const { setFieldValue } = useFormikContext()
  const initialValues: data = {
    rfc: '',
    tycBorder: false,
    tycMox: false
  }

  const validationSchema = Yup.object({
    rfc: Yup.string().required('Obligatorio'),
    tycBorder: Yup.bool()
      .required('Obligatorio')
      .oneOf([true], 'Debe aceptar los términos'),
    tycMox: Yup.bool()
      .required('Obligatorio')
      .oneOf([true], 'Debe aceptar los términos')
  })

  const handleSubmit = (values: data) => {
    console.log(values)
    setFieldValue('rfc', values.rfc)
    setFieldValue('tycBorder', values.tycBorder)
    setFieldValue('tycMox', values.tycMox)
    setStep(prev => prev + 1)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => handleSubmit(values)}
    >
      {({ touched, errors, handleSubmit }) => (
        <>
          <section className={styles.wrapper}>
            <div className={styles.formContainer}>
              <h1>Ingresa tu RFC</h1>

              <div className={styles.containerInput}>
                <Alert
                  message="El RFC ingresado no es válido"
                  icon={<AlertTriangle />}
                  error={touched.rfc && errors.rfc ? 'alert-block' : ''}
                />
                <Field
                  name="rfc"
                  className={
                    touched.rfc && errors.rfc
                      ? styles.rfcInputError
                      : styles.rfcInput
                  }
                  placeholder="MOX202323"
                />
              </div>

              <div className={styles.containerTyc}>
                <div className={styles.tyc}>
                  <Field
                    type="checkbox"
                    name="tycBorder"
                    className={styles.checkbox}
                  />
                  <span className={styles.text}>
                    Acepto los{' '}
                    <a
                      href="https://www.bordercredit.com/aviso-de-privacidad-integral"
                      target="_blank"
                      rel="noreferrer"
                    >
                      términos y condiciones de BorderCredit
                    </a>
                  </span>
                </div>
                <div className={styles.tyc}>
                  <Field
                    type="checkbox"
                    name="tycMox"
                    className={styles.checkbox}
                  />
                  <p className={styles.text}>
                    Autorizo la consulta de mis datos personales
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.imgWrapper}>
              <Image src={RFCImage} width={300} height={230} alt="RFC" />
            </div>
          </section>
          <Footer text="Continuar" action={handleSubmit} setStep={setStep} />
        </>
      )}
    </Formik>
  )
}

export default ValidateRFCStep
