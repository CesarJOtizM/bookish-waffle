import { ErrorMessage, Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import FileInput from '../../../general/atoms/fileInput/FileInput'
import styles from './accountStatus.module.scss'
import * as Yup from 'yup'
import Footer from '../../molecules/footer/Footer'

const AccountStatusStep: React.FC<IProps> = ({ setStep }) => {
  const [modal, setModal] = useState(true)
  const { values, setFieldValue } = useFormikContext()
  const fValues = values as initialValues

  const initialValues: initialValues = {
    accountStatus: '' || fValues.accountStatus,
    accountStatusName: '' || fValues.accountStatusName
  }

  const handleSubmit = (values: initialValues) => {
    console.log(values)
    Object.keys(values).forEach(e => {
      setFieldValue(e, values[e])
    })
    setStep(step => step + 1)
  }

  const validationSchema = Yup.object({
    accountStatus: Yup.string().required('Obligatorio')
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
                <label>Estado de cuenta</label>
                <FileInput
                  name="accountStatus"
                  fileName={fValues.accountStatusName}
                  type=".pdf/,image/*"
                  capture
                />
                <p>
                  <ErrorMessage name="accountStatus" />
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
                  Para poder continuar debes cargar un estado de cuenta que
                  compruebe tu solvencia
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

export default AccountStatusStep

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

type initialValues = {
  [accountStatus: string]: string
  accountStatusName: string
}
