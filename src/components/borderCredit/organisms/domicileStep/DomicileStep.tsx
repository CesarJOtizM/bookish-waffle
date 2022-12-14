import React, { useState } from 'react'
import { ErrorMessage, Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import { requestData } from '@helpers/requestData'
import FileInput from '@components/general/atoms/fileInput/FileInput'
import Footer from '@components/borderCredit/molecules/footer/Footer'
import { formValues } from '@components/borderCredit'
import styles from './domicileStep.module.scss'
import Portal from 'src/HOC/Portal'
import LowerModal from '@components/borderCredit/atoms/lowerModal/LowerModal'
import Loader from '@components/borderCredit/atoms/loader/Loader'
import ErrorModal from '@components/borderCredit/atoms/errorModal/ErrorModal'
import useModal from '@helpers/useModal'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}
interface domicileData {
  [domicile: string]: string
  domicileName: string
}

const DomicileStep: React.FC<IProps> = ({ setStep }) => {
  const [loader, setLoader] = useState(true)
  const { isShowing, toggle, prompt, title, desc } = useModal()
  const { values: fValues, setFieldValue } = useFormikContext<formValues>()

  const initialValues: domicileData = {
    domicile: fValues.domicile || '',
    domicileName: fValues.domicileName || ''
  }

  const handleSubmit = async (values: domicileData) => {
    setLoader(false)
    const { data, error, loaded } = await requestData(
      `${process.env.NEXT_PUBLIC_BORDER_URL}/validate/comprobante`,
      'POST',
      {
        data: {
          comprobante: values.domicile.split(',')[1]
        }
      },
      {
        'x-api-key': 'b33c881f-886d-44d0-aa98-98c7cd5584d9',
        'message-id': Date.now(),
        transactionId: fValues.transactionId
      }
    )

    if (!error && loaded) {
      const {
        data: { calle, colonia, ciudad }
      } = data
      Object.keys(values).forEach(e => {
        setFieldValue(e, values[e])
      })
      setFieldValue('address', `${calle}, ${colonia}, ${ciudad}`)
      setStep(step => step + 1)
      setLoader(loaded)
    } else {
      setLoader(loaded)
      prompt('Error', 'El documento que subiste no es legible.')
      console.log(error)
    }
  }

  const validationSchema = Yup.object({
    domicile: Yup.string().required('Obligatorio')
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
                <div className={styles.description}>
                  <p>
                    Toma una foto o sube una que tengas guardada donde se lean
                    todos los datos de tu comprobante de domicilio
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
                  description="Toma una foto o sube una que tengas guardada donde se lean
                  todos los datos de tu comprobante de domicilio"
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

export default DomicileStep
