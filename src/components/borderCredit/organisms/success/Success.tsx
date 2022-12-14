import React, { useState } from 'react'
import Image from 'next/image'
import { Copy, Phone, Mail, MapPin } from 'feather-icons-react'
import callCenter from '@assets/img/CallCenter.png'
import Tooltip from '@components/general/atoms/tooltip'
import { copyText } from '@helpers/copyText'
import styles from './success.module.scss'
import { formValues } from '@components/borderCredit'
import { useFormikContext } from 'formik'

const Success: React.FC = () => {
  const { values: fValues } = useFormikContext<formValues>()
  const [active, setActive] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.success}>
        <Image src={callCenter} width={120} alt="Call center" />
        <p>
          Un representante de ventas se <br />
          contactará contigo
        </p>
      </div>

      <div className={styles.requestNumber}>
        <p>Número de solicitud</p>
        <div className={styles.number}>
          <p>{fValues.requestNumber} &#8194;</p>
          <Tooltip text={active ? 'Copiado!' : 'Copiar'}>
            <Copy
              size={16}
              onClick={() => copyText(fValues.requestNumber, setActive)}
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles.contactInfo}>
        <h1>Contáctenos</h1>
        <div className={styles.info}>
          <div className={styles.item}>
            <Phone size={18} color="#69E8D9" />
            <p>(656) 257 1720</p>
          </div>
          <div className={styles.item}>
            <Mail size={18} color="#69E8D9" />
            <p>info@bordercredit.com</p>
          </div>
          <div className={styles.item}>
            <MapPin size={18} color="#69E8D9" />
            <p>
              Av. López Mateos 135 N. Piso 2 Oficina 1720, <br />
              Col. Pronaf C.P. 32315
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success
