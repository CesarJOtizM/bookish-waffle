import { ErrorMessage, Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import FileInput from '../../../general/atoms/fileInput/FileInput'
import styles from './domicileStep.module.scss'
import * as Yup from 'yup'
import Footer from '../../molecules/footer/Footer'

const DomicileStep: React.FC<IProps> = ({ setStep }) => {
  const [modal, setModal] = useState(true)
  const { values, setFieldValue } = useFormikContext()
  const fValues = values as initialValues

  const initialValues: initialValues = {
    domicile: '' || fValues.domicile,
    domicileName: '' || fValues.domicileName
  }

  const handleSubmit = (values: initialValues) => {
    console.log(values)
    Object.keys(values).forEach(e => {
      setFieldValue(e, values[e])
    })
    setStep(step => step + 1)
  }

  const validationSchema = Yup.object({
    domicile: Yup.string().required('Obligatorio')
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div>
                <label>Comprobante de domicilio</label>
                <FileInput
                  name="domicile"
                  fileName={fValues.domicileName}
                  type=".pdf/,image/*"
                  capture
                />
                <p>
                  <ErrorMessage name="domicile" />
                </p>
              </div>
            </div>
            <div
              className={`${styles.modal} ${modal && styles.active}`}
              onClick={() => setModal(!modal)}
            >
              <div className={styles.card}>
                <h3>Carga tus documentos</h3>
                <p>
                  Toma una foto o sube una que tengas guardada donde se lean
                  todos los datos de tu comprobante de domicilio
                </p>
              </div>
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

export default DomicileStep

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

type initialValues = {
  [domicile: string]: string
  domicileName: string
}
