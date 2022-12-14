import { ErrorMessage, Formik, useFormikContext } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { requestData } from '@helpers/requestData'
import FileInput from '@components/general/atoms/fileInput/FileInput'
import Footer from '@components/borderCredit/molecules/footer/Footer'
import type { formValues } from '@components/borderCredit'
import styles from './ineStep.module.scss'
import Portal from '../../../../HOC/Portal'
import LowerModal from '@components/borderCredit/atoms/lowerModal/LowerModal'
import Loader from '@components/borderCredit/atoms/loader/Loader'
import ErrorModal from '@components/borderCredit/atoms/errorModal/ErrorModal'
import useModal from '@helpers/useModal'

interface IProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

interface ineData {
  [ineFront: string]: string
  ineFrontName: string
  ineBack: string
  ineBackName: string
  selfie: string
  selfieName: string
}

const INEStep: React.FC<IProps> = ({ setStep }) => {
  const [loader, setLoader] = useState(true)
  const { isShowing, toggle, prompt, title, desc } = useModal()
  const { values: fValues, setFieldValue } = useFormikContext<formValues>()

  const initialValues: ineData = {
    ineFront: fValues.ineFront || '',
    ineFrontName: fValues.ineFrontName || '',
    ineBack: fValues.ineBack || '',
    ineBackName: fValues.ineBackName || '',
    selfie: fValues.selfie || '',
    selfieName: fValues.selfieName || ''
  }

  const handleSubmit = async (values: ineData) => {
    setStep(step => step + 1)
  }

  const validationSchema = Yup.object({
    ineFront: Yup.string().required('Obligatorio'),
    ineBack: Yup.string().required('Obligatorio'),
    selfie: Yup.string().required('Obligatorio')
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
                <div className={styles.description}>
                  <p>
                    Toma una foto o sube una que tengas guardada donde se lean
                    todos los datos de tu INE y se vea tu rostro claramente.
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
                  description="Toma una foto o sube una que tengas guardada donde se lean todos los datos de tu INE y se vea tu rostro claramente."
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
              <button onClick={() => setLoader(false)}>Loader</button>
              <button
                onClick={() =>
                  prompt(
                    'Error',
                    'No hemos podido validar que los documentos correspondan a la misma persona, por favor vuelve a intentarlo.'
                  )
                }
              >
                error
              </button>
            </>
          )}
        </Formik>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default INEStep
