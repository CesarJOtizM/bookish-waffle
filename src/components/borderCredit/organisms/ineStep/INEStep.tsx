import { ErrorMessage, Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import FileInput from '../../../general/atoms/fileInput/FileInput'
import styles from './ineStep.module.scss'
import * as Yup from 'yup'
import Footer from '../../molecules/footer/Footer'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

type initialValues = {
  [ineFront: string]: string
  ineFrontName: string
  ineBack: string
  ineBackName: string
  selfie: string
  selfieName: string
}

const INEStep: React.FC<IProps> = ({ setStep }) => {
  const [modal, setModal] = useState(true)

  const { values, setFieldValue } = useFormikContext()
  const fValues = values as initialValues

  const initialValues: initialValues = {
    ineFront: '' || fValues.ineFront,
    ineFrontName: '' || fValues.ineFrontName,
    ineBack: '' || fValues.ineBack,
    ineBackName: '' || fValues.ineBackName,
    selfie: '' || fValues.selfie,
    selfieName: '' || fValues.selfieName
  }

  const handleSubmit = (values: initialValues) => {
    console.log(values)
    Object.keys(values).forEach(e => {
      setFieldValue(e, values[e])
    })
    setStep(step => step + 1)
  }

  const validationSchema = Yup.object({
    ineFront: Yup.string().required('Obligatorio'),
    ineBack: Yup.string().required('Obligatorio'),
    selfie: Yup.string().required('Obligatorio')
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
                <label>INE parte frontal</label>
                <FileInput
                  name="ineFront"
                  fileName={fValues.ineFrontName}
                  type="image/*"
                />
                <p>
                  <ErrorMessage name="ineFront" />
                </p>
              </div>
              <div>
                <label>INE parte trasera</label>
                <FileInput
                  name="ineBack"
                  fileName={fValues.ineBackName}
                  type="image/*"
                />
                <p>
                  <ErrorMessage name="ineBack" />
                </p>
              </div>
              <div>
                <label>Selfie</label>
                <FileInput
                  name="selfie"
                  fileName={fValues.selfieName}
                  type="image/*"
                />
                <p>
                  <ErrorMessage name="selfie" />
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
                  todos los datos de tu INE y se vea tu rostro claramente.
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

export default INEStep
