import React from 'react'
import PoweredBy from '@components/general/atoms/poweredBy/PoweredBy'
import styles from './footer.module.scss'

interface Iprops {
  text: string
  action: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
  prev?: boolean
}

const Footer: React.FC<Iprops> = ({ text, action, prev, setStep }) => {
  return (
    <div className={styles.wrapper}>
      {prev ? (
        <button
          type="button"
          onClick={() => setStep(prev => prev - 1)}
          className={styles.back}
        >
          Anterior
        </button>
      ) : (
        <div></div>
      )}
      <button type="button" onClick={() => action()}>
        {text}
      </button>
      <PoweredBy />
    </div>
  )
}

export default Footer
