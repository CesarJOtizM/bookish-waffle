import React from 'react'
import { Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import Footer from '@components/borderCredit/molecules/footer/Footer'
import type { formValues } from '@components/borderCredit'
import Grettings from '@assets/img/greetings.svg'
import IdCardFilled from '@assets/img/IdcardFilled.svg'
import HomeFilled from '@assets/img/HomeFilled.svg'
import FileTextFilled from '@assets/img/FileTextFilled.svg'
import styles from './validateRFCStep.module.scss'
import Checkbox from '@components/borderCredit/atoms/checkbox/Checkbox'

interface rfcData {
  tycBorder: boolean
  tycMox: boolean
}

interface Iprops {
  setStep: React.Dispatch<React.SetStateAction<number>>
}
const ValidateRFCStep: React.FC<Iprops> = ({ setStep }) => {
  const { setFieldValue, values } = useFormikContext<formValues>()

  const initialValues: rfcData = {
    tycBorder: values.tycBorder || false,
    tycMox: values.tycMox || false
  }

  const validationSchema = Yup.object({
    tycBorder: Yup.bool()
      .required('Obligatorio')
      .oneOf([true], 'Debe aceptar los términos'),
    tycMox: Yup.bool()
      .required('Obligatorio')
      .oneOf([true], 'Debe aceptar los términos')
  })

  const handleSubmit = (values: rfcData) => {
    console.log(values)
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
      {({ handleSubmit }) => (
        <>
          <section className={styles.wrapper}>
            <div className={styles.formContainer}>
              <div>
                <h1>Crédito de Nomina Border Credit</h1>
                <span className={styles.spanwicon}>
                  Ten a la mano los siguientes documentos
                </span>
              </div>
              <div>
                <div>
                  <span className={styles.spanwicon}>
                    <Image
                      src={IdCardFilled}
                      alt="ID Card Image"
                      className={styles.icons}
                    />
                    INE
                  </span>
                </div>
                <div>
                  <span className={styles.spanwicon}>
                    <Image
                      src={HomeFilled}
                      alt="ID Card Image"
                      className={styles.icons}
                    />
                    Comprobante de Domicilio {`(REF o TELMEX)`}
                  </span>
                </div>
                <div>
                  <span className={styles.spanwicon}>
                    <Image
                      src={FileTextFilled}
                      alt="ID Card Image"
                      className={styles.icons}
                    />
                    Estado de cuenta reciente
                  </span>
                </div>
              </div>
              <div className={styles.containerTyc}>
                <Checkbox
                  name="tycBorder"
                  label={
                    <span>
                      Acepto los{' '}
                      <strong>
                        <a
                          href="https://www.bordercredit.com/aviso-de-privacidad-integral"
                          target="_blank"
                          rel="noreferrer"
                        >
                          términos y condiciones de BorderCredit
                        </a>
                      </strong>
                    </span>
                  }
                />
                <Checkbox
                  name="tycMox"
                  label={
                    <span>
                      Autorizo la{' '}
                      <strong>
                        <a
                          href="https://mox.cash/#/termsandconditions"
                          target="_blank"
                          rel="noreferrer"
                        >
                          consulta de mis datos personales
                        </a>
                      </strong>
                    </span>
                  }
                />
              </div>
            </div>

            <div className={styles.imgWrapper}>
              <Image src={Grettings} className={styles.image} alt="Grettings" />
            </div>
          </section>
          <Footer text="Continuar" action={handleSubmit} setStep={setStep} />
        </>
      )}
    </Formik>
  )
}

export default ValidateRFCStep
