import React, { useEffect, useState } from 'react'
import { Field, useFormikContext } from 'formik'
import { File, Image, UploadCloud } from 'feather-icons-react'
import styles from './fileInput.module.scss'

interface IProps {
  name: string
  fileName?: string
  type?: string
  capture?: boolean
}

/* type valuesType = {
  [name: string]: string
} */

const FileInput: React.FC<IProps> = ({ name, fileName, type, capture }) => {
  const [fName, setFName] = useState(fileName || '')
  const [fType, setFType] = useState<'doc' | 'image' | 'none'>('none')
  /* const [b64, setB64] = useState('') */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setFieldValue, values: fValues } = useFormikContext<any>()

  useEffect(() => {
    if (fName) {
      if (fValues[name].includes('image')) {
        setFType('image')
      } else {
        setFType('doc')
      }
    }
  }, [fName, fType, fValues, name])

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.DragEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement

    if (target.files?.length === 1) {
      if (
        target.files[0].type === 'image/png' ||
        target.files[0].type === 'image/jpeg' ||
        target.files[0].type === 'image/jpg' ||
        target.files[0].type === 'application/pdf'
      ) {
        if (
          target.files[0].type === 'image/png' ||
          target.files[0].type === 'image/jpeg' ||
          target.files[0].type === 'image/jpg'
        ) {
          setFType('image')
        } else {
          setFType('doc')
        }

        let string = target.files[0].name

        if (string.length > 11) string = `...${string.slice(-9)}`

        setFName(string)

        const photo = target.files
        const reader = new FileReader()

        reader.onloadend = () => {
          setFieldValue(name, reader.result as string)
          /* setB64(reader.result as string) */
          setFieldValue(`${name}Name`, string)
        }

        if (photo) reader.readAsDataURL(photo[0])
      } else {
        setFType('none')
        setFName('')
      }
    }
  }

  return (
    <div className={styles.container}>
      <Field
        className={styles.input}
        type="file"
        id={name}
        name={name}
        accept={type}
        onChange={handleChange}
        onDrop={handleChange}
        capture={capture ? 'user' : false}
        value={undefined}
      />
      <label htmlFor={name}>
        <span>
          {fType === 'none' ? (
            <UploadCloud size="16" strokeWidth="2" />
          ) : fType === 'doc' ? (
            <File size="24" strokeWidth="1" />
          ) : (
            // <span className={styles.imgContainer}>
            //  {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
            //  <img src={b64} /* width="46px" */ height="46px" />
            // </span>
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image size="24" strokeWidth="1" />
          )}
          {fName || 'Subir'}
        </span>
      </label>
    </div>
  )
}

export default FileInput
