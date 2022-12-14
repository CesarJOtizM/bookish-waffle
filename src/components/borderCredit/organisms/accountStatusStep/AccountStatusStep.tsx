import React, { useState } from 'react'
import { ErrorMessage, Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import FileInput from '@components/general/atoms/fileInput/FileInput'
import Footer from '@components/borderCredit/molecules/footer/Footer'
import type { formValues } from '@components/borderCredit'
import styles from './accountStatus.module.scss'
import { requestData } from '@helpers/requestData'
import Portal from 'src/HOC/Portal'
import LowerModal from '@components/borderCredit/atoms/lowerModal/LowerModal'
import Loader from '@components/borderCredit/atoms/loader/Loader'
import ErrorModal from '@components/borderCredit/atoms/errorModal/ErrorModal'
import useModal from '@helpers/useModal'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

type accountData = {
  [accountStatus: string]: string
  accountStatusName: string
}

const AccountStatusStep: React.FC<IProps> = ({ setStep }) => {
  const [loader, setLoader] = useState(true)
  const { isShowing, toggle, prompt, title, desc } = useModal()
  const { values: fValues, setFieldValue } = useFormikContext<formValues>()

  const initialValues: accountData = {
    accountStatus: fValues.accountStatus || '',
    accountStatusName: fValues.accountStatusName || ''
  }

  const handleSubmit = async (values: accountData) => {
    setLoader(false)
    const { error, loaded } = await requestData(
      `${process.env.NEXT_PUBLIC_BORDER_URL}/send/estadodecuenta`,
      'POST',
      {
        data: {
          fileName: values.accountStatusName,
          fileFormat: values.accountStatusName.split('.').pop(),
          folder: 'border',
          fileB64: values.accountStatus.split(',')[1]
        }
      },
      {
        'x-api-key': 'b33c881f-886d-44d0-aa98-98c7cd5584d9',
        'message-id': Date.now()
      }
    )
    if (!error && loaded) {
      // const { data } = data
      Object.keys(values).forEach(e => {
        setFieldValue(e, values[e])
      })
      setLoader(loaded)
      setStep(step => step + 1)
    } else {
      setLoader(loaded)
      prompt('Error', 'El documento que subiste no es legible.')
      console.log(error)
    }
  }

  const validationSchema = Yup.object({
    accountStatus: Yup.string().required('Obligatorio')
  })

  return (
    <>
      {loader ? (
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
                <div className={styles.description}>
                  <p>
                    Para poder continuar debes cargar un estado de cuenta que
                    compruebe tu solvencia.
                  </p>
                </div>
              </div>
              <Footer
                text="Continuar"
                action={handleSubmit}
                prev
                setStep={setStep}
              />
              <Portal>
                <LowerModal
                  title="Carga tus documentos"
                  description="Para poder continuar debes cargar un estado de cuenta que
                    compruebe tu solvencia."
                />
              </Portal>
              <Portal>
                <ErrorModal
                  isShowing={isShowing}
                  hide={toggle}
                  title={title}
                  desc={desc}
                />
              </Portal>
            </>
          )}
        </Formik>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default AccountStatusStep
